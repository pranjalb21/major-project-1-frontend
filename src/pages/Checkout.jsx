import React, { useEffect, useState } from "react";
import useProduct from "../contexts/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import SuccessfullOrder from "../components/SuccessfullOrder";

export default function Checkout() {
    const { addresses, placeOrder, cart } = useProduct();
    const [orderPlacedLoader, setOrderPlacedLoader] = useState(false);
    const [shippingAddress, setShippingAddress] = useState();
    useEffect(() => {
        const selectedAddress = addresses?.filter(
            (address) => address.isPrimary
        );
        if (selectedAddress) {
            setShippingAddress(selectedAddress[0]);
        }
    }, [addresses]);
    const navigate = useNavigate();

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

    const handlePlaceOrder = () => {
        const totalOrderPrice = calculateTotalDiscountedPrice(cart);
        const cartData = cart.map((item) => ({
            productId: item.productId._id,
            productCount: item.productCount,
            cost: calculateDiscountPrice(item),
        }));
        const address = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.pin}`;
        const orderData = {
            items: cartData,
            totalOrderPrice,
            shippingAddress: address,
        };
        placeOrder(orderData);
        setOrderPlacedLoader(true);
        setTimeout(() => {
            setOrderPlacedLoader(false);
            navigate("/");
        }, 5000);
    };
    return (
        <main className="py-3">
            {!orderPlacedLoader ? (
                <section>
                    <div className="container bg-white py-4 shadow">
                        <h2 className="fs-3">Checkout</h2>
                        <hr />
                        <p>
                            <span className="fw-medium">Ship to:</span>
                            <br />
                            {shippingAddress?.street},&nbsp;
                            {shippingAddress?.city}
                            ,&nbsp; {shippingAddress?.state},&nbsp;
                            {shippingAddress?.pin}
                        </p>
                        <hr />

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
                                        <td className="text-center">
                                            {p.productCount}
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
                                <Link to={"/cart"}>
                                    <button className="btn btn-info btn-sm col-12">
                                        Edit Order
                                    </button>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <button
                                    className="btn btn-warning btn-sm col-12"
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <SuccessfullOrder />
            )}
        </main>
    );
}
