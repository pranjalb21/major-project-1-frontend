import React, { useState } from "react";
import cartData from "../assets/cart.json";
import { Link } from "react-router-dom";
export default function Cart() {
    const [totalPrice, setTotalPrice] = useState(0);

    // Calculate discounted price of every product
    const calculateDiscountPrice = (product) => {
        return parseFloat(
            product.price *
                product.minimumOrderQuantity *
                ((100 - product.discountPercentage) / 100)
        ).toFixed(2);
    };

    // Calculate total discounted price of every product
    const calculateTotalDiscountedPrice = (products) => {
        return parseFloat(
            products
                .reduce(
                    (acc, curr) =>
                        acc +
                        curr.price *
                            curr.minimumOrderQuantity *
                            ((100 - curr.discountPercentage) / 100),
                    0
                )
                .toFixed(2)
        );
    };

    // Calculate total price of products
    const calculateTotalPrice = (products) => {
        return parseFloat(
            products
                .reduce(
                    (acc, curr) => acc + curr.price * curr.minimumOrderQuantity,
                    0
                )
                .toFixed(2)
        );
    };

    // Calculate total product quantity
    const calculateTotalQuantity = (products) => {
        return cartData.reduce(
            (acc, curr) => acc + parseInt(curr.minimumOrderQuantity),
            0
        );
    };
    return (
        <main className="py-3">
            <div className="container bg-white py-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sl No.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">MRP($)</th>
                            <th scope="col">Discount(%)</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.map((p) => (
                            <tr key={p.id}>
                                <th scope="row">{p.id}</th>
                                <td>{p.title}</td>
                                <td>{p.minimumOrderQuantity}</td>
                                <td>{p.price}</td>
                                <td>{p.discountPercentage}</td>
                                <td>
                                    <s>{p.price * p.minimumOrderQuantity}</s>
                                    <br /> {calculateDiscountPrice(p)}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <th scope="row"></th>
                            <td className="fw-medium">Total:</td>
                            <td className="fw-medium">
                                {calculateTotalQuantity(cartData)}
                            </td>
                            <td></td>
                            <td></td>
                            <td className="fw-medium">
                                <s>{calculateTotalPrice(cartData)}</s>
                                <br />
                                {calculateTotalDiscountedPrice(cartData)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="row g-3">
                    <div className="col-md-6">
                        <Link to={"/"}>
                            <button className="btn btn-info btn-sm col-12">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to={"/checkout"}>
                            <button className="btn btn-warning btn-sm col-12">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
