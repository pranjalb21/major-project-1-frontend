import React, { useState } from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import useProduct from "../contexts/ProductContext";

export default function QuantityModifier({ quantity, setQuantity }) {
    const handleQuantityChange = (type) => {
        if (type === "decrement") {
            if (quantity > 1) {
                const newQty = quantity - 1;
                setQuantity(newQty);
            }
        } else if (type === "increment") {
            const newQty = quantity + 1;
            setQuantity(newQty);
        }
    };
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="fs-6 d-flex" aria-disabled="true">
                <FiMinusSquare
                    className=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleQuantityChange("decrement")}
                />
            </div>
            <span className="px-2 text-center" style={{width: "2rem"}}>{quantity}</span>
            <div className="fs-6 d-flex">
                <FiPlusSquare
                    className=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleQuantityChange("increment")}
                />
            </div>
        </div>
    );
}
