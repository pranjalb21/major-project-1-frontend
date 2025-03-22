import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function SuccessfullOrder() {
    return (
        <main className="container py-4">
            <div className="d-flex flex-column justify-content-center text-center bg-body shadow p-4">
                <div className="fs-1 align-self-center my-3 text-success">
                    <FaCheckCircle />
                </div>
                <h3>Congratulations! </h3>
                <h3>Your order has been placed successfully.</h3>
            </div>
        </main>
    );
}
