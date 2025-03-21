import React, { useEffect, useState } from "react";
import useProduct from "../contexts/ProductContext";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
    const { addresses } = useProduct();
    const [shippingAddress, setShippingAddress] = useState();
    useEffect(() => {
        const selectedAddress = addresses?.filter(
            (address) => address.isPrimary
        );
        if (selectedAddress) {
            setShippingAddress(selectedAddress[0]);
        }
    }, [addresses]);
    const { cart, fetchCart } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);
    useEffect(() => {
        if (!cart?.length > 0) {
            navigate("/cart");
        }
    }, [cart]);

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
            <div className="container bg-white py-4">
                <h2 className="fs-4">Checkout</h2>
                <section>
                    <p>
                        Ship to: <br />
                        {shippingAddress?.street},&nbsp;{shippingAddress?.city}
                        ,&nbsp; {shippingAddress?.state},&nbsp;
                        {shippingAddress?.pin}
                        <br />
                        <small>
                            {" "}
                            <Link
                                className="text-decoration-none"
                                to={"/profile"}
                            >
                                Change
                            </Link>
                        </small>
                    </p>
                    {cart && cart.length > 0 ? (
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
                                    {cart.map((p, i) => (
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
                                            <td></td>
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
                                                <br /> $
                                                {calculateDiscountPrice(p)}
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
                                            $
                                            {calculateTotalDiscountedPrice(
                                                cart
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <Link to={"/cart"}>
                                        <button className="btn btn-info btn-sm col-12">
                                            Edit Order
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Link to={"/checkout"}>
                                        <button className="btn btn-warning btn-sm col-12">
                                            Place Order
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>No items in cart</p>
                    )}
                </section>
            </div>
        </main>
    );
}
