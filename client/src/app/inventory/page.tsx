"use client";

import { useGetProductsQuery } from '@/state/api';

const Inventory = () => {
    const {data: products, isError, isLoading } = useGetProductsQuery();
    console.log("products:", products);

  return <div>inventory</div>;
};

export default Inventory