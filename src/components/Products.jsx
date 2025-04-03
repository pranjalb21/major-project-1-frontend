import React, { useEffect, useState } from "react";
import useProduct from "../contexts/ProductContext";
import ProductCard from "./ProductCard";

export default function Products({ currentPage }) {
    // Parse query parameters
    const { productList } = useProduct();

    return (
        <div className="container mt-3">
            <div className="row g-3">
                {productList?.map((p) => (
                    <ProductCard product={p} key={p._id} />
                ))}
            </div>
        </div>
    );
}
