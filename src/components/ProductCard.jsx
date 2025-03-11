import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import useProduct from "../contexts/ProductContext";
import { Link } from "react-router-dom";

export default function ProductCard({ productId }) {
    const { toggleCart, toggleWishList, productList } = useProduct();
    const [product, setProduct] = useState(
        productList.filter((p) => p.id == productId)[0]
    );
    useEffect(() => {
        const selectedProduct = productList.filter((p) => p.id == productId)[0];
        setProduct(selectedProduct);
    }, [productList]);
    return (
        <div className="col-6 col-md-4 col-lg-3">
            <div
                className="card shadow shadow-sm position-relative"
            >
                <div className="position-absolute fs-1 end-0 me-1 mt-1 top-0 p-1 fs-4  bg-light rounded-circle shadow-sm border d-flex">
                    {product.isAddedToWishlist ? (
                        <MdFavorite
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleWishList(product.id)}
                            className="text-danger"
                        />
                    ) : (
                        <FaRegHeart
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleWishList(product.id)}
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
                        to={`/product/${product.id}`}
                        className=" text-decoration-none"
                    >
                        <h6 className=" text-decoration-none text-black">
                            {product.title}
                        </h6>
                    </Link>
                    <p className="card-text">${product.price}</p>

                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => toggleCart(product.id)}
                    >
                        {product.isAddedToCart
                            ? "Remove from Cart"
                            : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}
