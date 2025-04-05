import React, { useEffect, useState } from "react";
import useProduct from "../contexts/ProductContext";
import ProductCard from "./ProductCard";

export default function Products({ currentPage }) {
    // Parse query parameters
    const { productList, loading } = useProduct();

    return (
        <div className="container mt-3 mb-3">
            {productList &&
                !loading &&
                (productList?.length > 0 ? (
                    <div className="row g-3">
                        {productList?.map((p) => (
                            <ProductCard product={p} key={p._id} />
                        ))}
                    </div>
                ) : (
                    <p>No product found.</p>
                ))}
        </div>
    );
}
