import React, { useState } from "react";
import useProduct from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

export default function Products() {
    const { filter } = useParams();
    const { productList } = useProduct();
    const [products, setProducts] = useState(
        filter === "all"
            ? productList
            : productList.filter((p) => p.category == filter)
    );
    return (
        <main className="container my-3">
            <div className="row g-3">
                {products.map((p) => (
                    <ProductCard productId={p.id} key={p.id} />
                ))}
            </div>
        </main>
    );
}
