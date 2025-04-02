import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../contexts/ProductContext";
import Pagination from "../components/Pagination";
export default function Wishlist() {
    const { wishlist, fetchWishlist, totalPages } = useProduct();
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchWishlist(currentPage);
    }, [currentPage]);

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
                <div className="">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </main>
    );
}
