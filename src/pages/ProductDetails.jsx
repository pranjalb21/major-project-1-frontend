import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../contexts/ProductContext";
import Rating from "../components/Rating";

export default function ProductDetails() {
    const { id } = useParams();
    const { productList, toggleCart } = useProduct();
    const [product, setProduct] = useState(
        productList.filter((p) => p.id == id)[0]
    );
    useEffect(() => {
        const selectedProduct = productList.filter((p) => p.id == id)[0];
        setProduct(selectedProduct);
    }, [productList]);
    return (
        <main className="container">
            <div className="row g-3 my-3">
                <div className="col-sm-4 d-flex flex-column">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="img-fluid"
                    />
                    <button className="btn btn-sm btn-secondary mt-2">
                        Buy Now
                    </button>
                    <button
                        className={`btn btn-sm btn-${
                            product.isAddedToCart ? "danger" : "warning"
                        } mt-2`}
                        onClick={() => toggleCart(product.id)}
                    >
                        {product.isAddedToCart ? "Remove from" : "Add to"} Cart
                    </button>
                </div>
                <div className="col-md-8">
                    <h3 className="fs-5 fw-normal">{product.title}</h3>
                    <Rating rate={product.rating} />
                    <p className="mt-3 fw-medium fs-6 m-0 p-0">
                        $
                        {parseFloat(
                            (product.price *
                                (100 - product.discountPercentage)) /
                                100
                        ).toFixed(2)}
                        <small>
                            <s className="ms-3 fw-normal ">${product.price}</s>
                        </small>
                    </p>
                    <p className="fw-bold p-0 text-body-secondary">
                        <small>{product.discountPercentage}% Off</small>
                    </p>
                </div>
            </div>
        </main>
    );
}
