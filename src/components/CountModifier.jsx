import React from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import useProduct from "../contexts/ProductContext";

export default function CountModifier({ product }) {
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
        useProduct();
    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-evenly  align-items-center">
                <div className="fs-6 d-flex">
                    <FiMinusSquare
                        className=""
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            removeItemFromCart(product.productId._id)
                        }
                    />
                </div>
                <span>{product.productCount}</span>
                <div className="fs-6 d-flex">
                    <FiPlusSquare
                        className=""
                        style={{ cursor: "pointer" }}
                        onClick={() => addItemToCart(product.productId._id)}
                    />
                </div>
            </div>
            <div className="text-center">
                <small
                    className="remove"
                    style={{ cursor: "pointer", color: "blue" }}
                    onMouseEnter={(e) => (e.target.style.color = "red")}
                    onMouseLeave={(e) => {
                        e.target.style.color = "blue";
                    }}
                    onClick={() => deleteItemFromCart(product.productId._id)}
                >
                    Remove
                </small>
            </div>
        </div>
    );
}
