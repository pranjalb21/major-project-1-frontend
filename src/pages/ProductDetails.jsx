import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../contexts/ProductContext";
import Rating from "../components/Rating";

export default function ProductDetails() {
    const { id } = useParams();
    const { productList, toggleCart, getProductById, selectedProduct } =
        useProduct();

    useEffect(() => {
        getProductById(id);
    }, []);
    return (
        <main className="container">
            <div className="row g-3 my-3">
                {selectedProduct && (
                    <>
                        <div className="col-sm-4 d-flex flex-column">
                            <img
                                src={selectedProduct.thumbnail}
                                alt={selectedProduct.title}
                                className="img-fluid"
                            />
                            <button className="btn btn-sm btn-secondary mt-2">
                                Buy Now
                            </button>
                            <button
                                className={`btn btn-sm btn-${
                                    selectedProduct.isAddedToCart
                                        ? "danger"
                                        : "warning"
                                } mt-2`}
                                onClick={() => console.log("ud")}
                            >
                                {selectedProduct.isAddedToCart
                                    ? "Remove from"
                                    : "Add to"}{" "}
                                Cart
                            </button>
                        </div>
                        <div className="col-md-8">
                            <h3 className="fs-5 fw-normal">
                                {selectedProduct.title}
                            </h3>
                            <Rating rate={selectedProduct.rating} />
                            <p className="mt-3 fw-medium fs-6 m-0 p-0">
                                $
                                {parseFloat(
                                    (selectedProduct.price *
                                        (100 -
                                            selectedProduct.discountPercentage)) /
                                        100
                                ).toFixed(2)}
                                <small>
                                    <s className="ms-3 fw-normal ">
                                        ${selectedProduct.price}
                                    </s>
                                </small>
                            </p>
                            <p className="fw-bold p-0 text-body-secondary">
                                <small>
                                    {selectedProduct.discountPercentage}% Off
                                </small>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
