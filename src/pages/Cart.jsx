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
        cartTotalCount,
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
        <main className="py-3 container h-100">
            <div className="bg-white py-4 px-3 shadow h-100">
                {cart?.length > 0 ? (
                    <>
                        <div className="row g-2">
                            <div className="col-lg-8 border-end px-2">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Item</th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Quantity
                                            </th>
                                            <th scope="col">MRP</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {cart?.map((p, i) => (
                                            <>
                                                <tr key={p.productId._id}>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <img
                                                                    src={
                                                                        p
                                                                            .productId
                                                                            .thumbnail
                                                                    }
                                                                    alt={
                                                                        p
                                                                            .productId
                                                                            .title
                                                                    }
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                            <div className="col-6">
                                                                <Link
                                                                    className="text-decoration-none"
                                                                    to={`/product/${p.productId._id}`}
                                                                >
                                                                    {
                                                                        p
                                                                            .productId
                                                                            .title
                                                                    }
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <CountModifier
                                                            product={p}
                                                        />
                                                    </td>
                                                    <td>
                                                        ${p.productId.price}
                                                    </td>
                                                    <td>
                                                        <s>
                                                            $
                                                            {parseFloat(
                                                                p.productId
                                                                    .price *
                                                                    p.productCount
                                                            ).toFixed(2)}
                                                        </s>
                                                        <br /> $
                                                        {calculateDiscountPrice(
                                                            p
                                                        )}
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-4 border-start px-2">
                                <div className="w-100">
                                    <div className="mt-">
                                        <p className="m-0">
                                            Select Delivery Address:
                                        </p>
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
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            name="selectedAddress"
                                                            checked={
                                                                a.isPrimary
                                                            }
                                                            onChange={() =>
                                                                changePrimaryAddress(
                                                                    a._id
                                                                )
                                                            }
                                                        />
                                                        <p className="m-0 ms-2">
                                                            {a.street}, {a.city}{" "}
                                                            <br />
                                                            {a.state}, {a.pin}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h6 className="fs-6">Order Details</h6>
                                    <hr className="mt-0" />
                                    <table className="table mt-0">
                                        <tbody>
                                            <tr>
                                                <td scope="row">Total Items:</td>
                                                <td className="text-end">{cartTotalCount}</td>
                                            </tr>
                                            <tr>
                                                <td scope="row">MRP Price:</td>
                                                <td className="text-end"><s>${calculateTotalPrice(cart)}</s></td>
                                            </tr>
                                            <tr>
                                                <td scope="row">Your Price:</td>
                                                <td className="text-end">${calculateTotalDiscountedPrice(cart)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* <td className="fw-medium">Total:</td>
                                    <td className="fw-medium text-center">
                                        {calculateTotalQuantity(cart)}
                                    </td>
                                    <td>
                                        <s>${calculateTotalPrice(cart)}</s>
                                    </td>
                                    <td></td>
                                    <td className="fw-medium">
                                        ${calculateTotalDiscountedPrice(cart)}
                                    </td> */}
                                </div>
                                <div className="row g-1 mt-2">
                                    <div className="col-lg-6">
                                        <Link to={"/"}>
                                            <button className="btn btn-info btn-sm col-12 h-100">
                                                Continue Shopping
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-lg-6">
                                        <Link to={"/checkout"}>
                                            <button className="btn btn-warning btn-sm col-12">
                                                Proceed to Checkout
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <h2 className="fs-3">Cart</h2> */}
                        {/* <table className="table">
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
                        </div> */}
                    </>
                ) : (
                    <p>No items in cart</p>
                )}
            </div>
        </main>
    );
}
