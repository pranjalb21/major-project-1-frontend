import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useProduct from "../contexts/ProductContext";
import { TITLE } from "../lib/constants";

export default function OrderDetails() {
    const { orderId } = useParams();
    const { selectedOrder, getOrderWithId } = useProduct();
    useEffect(() => {
        getOrderWithId(orderId);
    }, [orderId]);

    useEffect(() => {
        document.title = TITLE + "Order Details";
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

    const calculateTotalItems = (items) => {
        return items.reduce(
            (acc, curr) => acc + parseInt(curr.productCount),
            0
        );
    };
    return (
        <main className="py-3 container h-100">
            <div className="bg-white py-4 px-3 shadow h-100">
                {selectedOrder && selectedOrder ? (
                    <>
                        <h5 className="fs-5">
                            Order <span>#{selectedOrder.orderId}</span>
                        </h5>
                        <hr className="m-0" />
                        <div className="row g-2">
                            <div className="col-lg-8 px-2">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-4">
                                                Item
                                            </th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">MRP</th>
                                            <th scope="col">Your Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {selectedOrder?.items?.map((item) => (
                                            <tr key={item.productId._id}>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <img
                                                                src={
                                                                    item
                                                                        .productId
                                                                        .thumbnail
                                                                }
                                                                alt={
                                                                    item
                                                                        .productId
                                                                        .title
                                                                }
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <Link
                                                                className="text-decoration-none"
                                                                to={`/product/${item.productId._id}`}
                                                            >
                                                                {
                                                                    item
                                                                        .productId
                                                                        .title
                                                                }
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    {item.productCount}
                                                </td>
                                                <td>${item.productId.price}</td>
                                                <td>
                                                    <s>
                                                        $
                                                        {parseFloat(
                                                            item.productId
                                                                .price *
                                                                item.productCount
                                                        ).toFixed(2)}
                                                    </s>
                                                    <br /> $
                                                    {calculateDiscountPrice(
                                                        item
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-4 px-2">
                                <div className="w-100">
                                    <div className="mt-">
                                        <p className="m-0 fw-medium">
                                            Shipped Address:
                                        </p>
                                        <p>{selectedOrder.shippingAddress}</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className="m-0 px-2 fs-5">Details:</p>
                                    <hr className="m-1" />
                                    <table className="table mt-0">
                                        <tbody>
                                            <tr>
                                                <td scope="row">
                                                    Total Items:
                                                </td>
                                                <td className="text-end">
                                                    {calculateTotalItems(
                                                        selectedOrder?.items
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">MRP:</td>
                                                <td className="text-end">
                                                    $&nbsp;
                                                    {calculateTotalPrice(
                                                        selectedOrder?.items
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">Your Price:</td>
                                                <td className="text-end">
                                                    $&nbsp;
                                                    {
                                                        selectedOrder.totalOrderPrice
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Order not found.</p>
                )}
            </div>
        </main>
    );
}
