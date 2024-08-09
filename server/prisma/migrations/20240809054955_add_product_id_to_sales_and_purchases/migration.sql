/*
  Warnings:

  - You are about to drop the column `productID` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_productID_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "productID",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
