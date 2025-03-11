import React from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../contexts/ProductContext";
export default function Wishlist() {
    const { productList } = useProduct();

    return (
        <main className="">
            <div className="container p-3">
                <div className="row g-3">
                    {productList
                        .filter((p) => p.isAddedToWishlist)
                        .map((p) => (
                            <ProductCard productId={p.id} key={p.id} />
                        ))}
                </div>
            </div>
        </main>
    );
}
