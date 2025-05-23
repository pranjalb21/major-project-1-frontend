import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../contexts/ProductContext";
import Pagination from "../components/Pagination";
import { TITLE } from "../lib/constants";
export default function Wishlist() {
    const { wishlist } = useProduct();
    useEffect(() => {
        document.title = TITLE + "Wishlist";
    }, []);
    return (
        <main className="container">
            <div className="d-flex flex-column h-100 ">
                <div className="container p-3">
                    <div className="row g-3">
                        {wishlist?.length > 0 ? (
                            wishlist?.map((p) => (
                                <ProductCard
                                    product={p.productId}
                                    key={p._id}
                                />
                            ))
                        ) : (
                            <div>
                                <p>Empty wishlist</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
