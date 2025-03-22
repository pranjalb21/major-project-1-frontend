import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../contexts/ProductContext";
export default function Wishlist() {
    const { wishlist, fetchWishlist } = useProduct();
    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <main className="">
            <div className="container p-3">
                <div className="row g-3">
                    {wishlist?.length > 0 ? (
                        wishlist?.map((p) => (
                                <ProductCard product={p.productId} key={p._id} />
                            ))
                    ) : (
                        <div>
                            <p>Empty wishlist</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
