import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../contexts/ProductContext";
import Rating from "../components/Rating";
import QuantityModifier from "../components/QuantityModifier";
import { GiCheckedShield } from "react-icons/gi";
import { MdLocalPostOffice } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { TbTruckReturn } from "react-icons/tb";
import { GiBoxUnpacking } from "react-icons/gi";

export default function ProductDetails() {
    const { id } = useParams();
    const { getProductById, selectedProduct, addItemWithQuantityToCart } =
        useProduct();
    const [quantity, setQuantity] = useState(1);

    const addCart = () => {
        addItemWithQuantityToCart(id, quantity);
        setQuantity(1);
    };
    useEffect(() => {
        getProductById(id);
    }, []);
    return (
        <main className="container">
            <div className="row g-3 my-3">
                {selectedProduct && (
                    <>
                        <div className="col-md-4 d-flex flex-column">
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
                                onClick={() => addCart()}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="col-md-8">
                            <div>
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
                                        {selectedProduct.discountPercentage}%
                                        Off
                                    </small>
                                </p>
                                <div className="d-flex">
                                    <span>Quantity: </span>&nbsp;
                                    <QuantityModifier
                                        quantity={quantity}
                                        setQuantity={setQuantity}
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex">
                                <div className="text-center">
                                    <GiCheckedShield className="fs-2" />
                                    <p className="m-0">
                                        <small>
                                            {
                                                selectedProduct.warrantyInformation
                                            }
                                        </small>
                                    </p>
                                </div>
                                <div className="text-center ms-4">
                                    <FiTruck className="fs-2" />
                                    <p className="m-0">
                                        <small>
                                            {
                                                selectedProduct.shippingInformation
                                            }
                                        </small>
                                    </p>
                                </div>
                                <div className="text-center ms-4">
                                    <GiBoxUnpacking className="fs-2" />
                                    <p className="m-0">
                                        <small>
                                            {selectedProduct.returnPolicy}
                                        </small>
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <p className="fw-medium">Description:</p>
                                <ul>
                                    <li>
                                        Details: {selectedProduct.description}
                                    </li>
                                    <li>Brand: {selectedProduct.brand}</li>
                                    <li>Weight: {selectedProduct.weight} KG</li>
                                    <li>
                                        Dimentions: {selectedProduct.dimensions.width} X {selectedProduct.dimensions.height} X {selectedProduct.dimensions.depth} cms
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
