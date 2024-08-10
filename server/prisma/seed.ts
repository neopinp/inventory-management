import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData() {
  // Delete records from tables that reference other tables first to avoid foreign key constraint errors
  await prisma.expenseByCategory.deleteMany({});
  await prisma.purchases.deleteMany({});
  await prisma.sales.deleteMany({});
  await prisma.expenses.deleteMany({});
  
  // Now delete from the tables that do not depend on other tables
  await prisma.salesSummary.deleteMany({});
  await prisma.purchaseSummary.deleteMany({});
  await prisma.expenseSummary.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.products.deleteMany({});

  console.log(`Cleared all data from the database`);
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData();

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      // Handle models with relationships
      if (modelName === "sales" || modelName === "purchases") {
        await model.create({
          data: {
            ...data,
          },
        });
      } else if (modelName === "expenseByCategory") {
        await model.create({
          data: {
            expenseByCategoryId: data.expenseByCategoryId,
            date: data.date,
            category: data.category,
            amount: data.amount,
            expenseSummary: {
              connect: {
                expenseSummaryId: data.expenseSummaryId,
              },
            },
          },
        });
      } else {
        await model.create({
          data,
        });
      }
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });