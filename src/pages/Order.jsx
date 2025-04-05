import React, { useEffect } from "react";
import useProduct from "../contexts/ProductContext";
import { Link } from "react-router-dom";

export default function Order() {
    const { fetchOrders, order } = useProduct();
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <main className="container mt-3 mb-4">
            <div className="shadow p-3">
                <h3>Orders</h3>
                <table className="table table-striped border">
                    <thead>
                        <tr>
                            <th scope="col">Order #</th>
                            <th scope="col" className="text-center">
                                No. of Items
                            </th>
                            <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.map((item) => (
                            <tr key={item.orderId}>
                                <td>
                                    <Link
                                        to={`/order/${item.orderId}`}
                                        className="text-decoration-none"
                                    >
                                        {item.orderId}
                                    </Link>
                                </td>
                                <td className="text-center">
                                    {item.items.length}
                                </td>
                                <td>${item.totalOrderPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
