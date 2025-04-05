import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import useProduct from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function ProductCard({ product }) {
    const { toggleWishList, isExistInWishlist, addItemToCart } = useProduct();
    return (
        <div className="col-6 col-md-4 col-lg-3">
            <div className="card shadow shadow-sm position-relative">
                <div className="position-absolute fs-1 end-0 me-1 mt-1 top-0 p-1 fs-4  bg-light rounded-circle shadow-sm border d-flex">
                    {isExistInWishlist(product._id) ? (
                        <MdFavorite
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleWishList(product._id)}
                            className="text-danger"
                        />
                    ) : (
                        <FaRegHeart
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleWishList(product._id)}
                        />
                    )}
                </div>
                <img
                    src={product.thumbnail}
                    className="card-img-top img-fluid"
                    alt={product.title}
                />
                <div className="card-body">
                    <Link
                        to={`/product/${product?._id}`}
                        className=" text-decoration-none"
                    >
                        <h6 className=" text-decoration-none text-black">
                            {product?.title}
                        </h6>
                    </Link>
                    <div className="d-flex justify-content-between">
                        <p className="card-text">${product?.price} </p>
                        <p className="d-flex align-items-center">
                            <FaRegStar /> &nbsp;
                            <span className="align-self-">{product?.rating}</span>
                        </p>
                    </div>

                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addItemToCart(product?._id)}
                    >
                        {product && "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}
