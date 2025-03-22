import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProduct from "../contexts/ProductContext";
import CountModifier from "../components/CountModifier";
export default function Cart() {
    const {
        cart,
        fetchCart,
        changePrimaryAddress,
        addresses,
        fetchAddress,
        fetchWishlist,
    } = useProduct();

    useEffect(() => {
        fetchCart();
        fetchAddress();
    }, []);

    // Calculate discounted price of every product
    const calculateDiscountPrice = (product) => {
        return parseFloat(
            product.productId.price *
                product.productCount *
                ((100 - product.productId.discountPercentage) / 100)
        ).toFixed(2);
    };

    // Calculate total discounted price of every product
    const calculateTotalDiscountedPrice = (products) => {
        return parseFloat(
            products
                .reduce(
                    (acc, curr) =>
                        acc +
                        curr.productId.price *
                            curr.productCount *
                            ((100 - curr.productId.discountPercentage) / 100),
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
                    (acc, curr) =>
                        acc + curr.productId.price * curr.productCount,
                    0
                )
                .toFixed(2)
        );
    };

    // Calculate total product quantity
    const calculateTotalQuantity = (products) => {
        return products.reduce(
            (acc, curr) => acc + parseInt(curr.productCount),
            0
        );
    };
    return (
        <main className="py-3">
            <div className="container bg-white py-4 shadow">
                {cart?.length > 0 ? (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sl No.</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col" className="text-center">
                                        Quantity
                                    </th>
                                    <th scope="col">MRP</th>
                                    <th scope="col">Discount(%)</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.map((p, i) => (
                                    <tr key={p.productId._id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>
                                            <Link
                                                className="text-decoration-none"
                                                to={`/product/${p.productId._id}`}
                                            >
                                                {p.productId.title}
                                            </Link>
                                        </td>
                                        <td>
                                            <CountModifier product={p} />
                                        </td>
                                        <td>${p.productId.price}</td>
                                        <td>
                                            {p.productId.discountPercentage}
                                        </td>
                                        <td>
                                            <s>
                                                $
                                                {p.productId.price *
                                                    p.productCount}
                                            </s>
                                            <br /> ${calculateDiscountPrice(p)}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <th scope="row"></th>
                                    <td className="fw-medium">Total:</td>
                                    <td className="fw-medium text-center">
                                        {calculateTotalQuantity(cart)}
                                    </td>
                                    <td>
                                        <s>${calculateTotalPrice(cart)}</s>
                                    </td>
                                    <td></td>
                                    <td className="fw-medium">
                                        ${calculateTotalDiscountedPrice(cart)}
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
                        <div className="mt-3">
                            <p className="m-0">Select Delivery Address:</p>
                            <ul className="list-group mt-1">
                                {addresses?.map((a) => (
                                    <li
                                        className="list-group-item "
                                        key={a._id}
                                    >
                                        <div className="form-check position-relative d-flex">
                                            <input
                                                className="form-check-input align-self-center"
                                                type="radio"
                                                id="flexCheckIndeterminate"
                                                style={{ cursor: "pointer" }}
                                                name="selectedAddress"
                                                checked={a.isPrimary}
                                                onChange={() =>
                                                    changePrimaryAddress(a._id)
                                                }
                                            />
                                            <p className="m-0 ms-2">
                                                {a.street}, {a.city} <br />
                                                {a.state}, {a.pin}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <p>No items in cart</p>
                )}
            </div>
        </main>
    );
}
