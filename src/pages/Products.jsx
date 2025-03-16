import React, { useEffect, useState } from "react";
import useProduct from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

export default function Products() {
    const { filter } = useParams();
    const { productList, fetchProduct } = useProduct();

    useEffect(() => {
        fetchProduct(filter);
    }, []);
    return (
        <main className="container my-3">
            <div className="row g-3">
                {productList &&
                    productList.map((p) => (
                        <ProductCard product={p} key={p._id} />
                    ))}
            </div>
        </main>
    );
}
