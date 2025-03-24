import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useProduct from "../contexts/ProductContext";

export default function OrderDetails() {
    const { orderId } = useParams();
    const { selectedOrder, getOrderWithId } = useProduct();
    useEffect(() => {
        getOrderWithId(orderId);
    }, [orderId]);
    useEffect(() => {
        console.log(selectedOrder);
    }, [selectedOrder]);
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
        <main className="my-3">
            <section>
                {selectedOrder && selectedOrder ? (
                    <div className="shadow p-3 container bg-white">
                        <h2 className="fs-2">Order Details</h2>
                        <hr />
                        <h4 className="fs-5">
                            Order ID : {selectedOrder.orderId}
                        </h4>
                        <p>Shipped Address: {selectedOrder.shippingAddress}</p>
                        <hr />
                        <div>
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
                                    {selectedOrder?.items?.map((item, i) => (
                                        <tr key={item.productId._id}>
                                            <th scope="row">{i + 1}</th>
                                            <td>
                                                <Link
                                                    className="text-decoration-none"
                                                    to={`/product/${item.productId._id}`}
                                                >
                                                    {item.productId.title}
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                {item.productCount}
                                            </td>
                                            <td>${item.productId.price}</td>
                                            <td>
                                                {
                                                    item.productId
                                                        .discountPercentage
                                                }
                                            </td>
                                            <td>
                                                <s>
                                                    $
                                                    {item.productId.price *
                                                        item.productCount}
                                                </s>
                                                <br /> $
                                                {calculateDiscountPrice(item)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <th scope="row"></th>
                                        <td className="fw-medium">Total:</td>
                                        <td className="fw-medium text-center">
                                            {calculateTotalQuantity(
                                                selectedOrder.items
                                            )}
                                        </td>
                                        <td>
                                            <s>
                                                $
                                                {calculateTotalPrice(
                                                    selectedOrder.items
                                                )}
                                            </s>
                                        </td>
                                        <td></td>
                                        <td className="fw-medium">
                                            $
                                            {calculateTotalDiscountedPrice(
                                                selectedOrder.items
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>Order not found.</p>
                )}
            </section>
        </main>
    );
}
