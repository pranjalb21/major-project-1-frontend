import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function SuccessfullOrder() {
    const [count, setCount] = useState(5);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount > 0) {
                    return prevCount - 1; // Decrement the count
                } else {
                    clearInterval(interval); // Clear interval when the count reaches 0
                    return prevCount;
                }
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <main className="container py-4">
            <div className="d-flex flex-column justify-content-center text-center bg-body shadow p-4">
                <div className="fs-1 align-self-center my-3 text-success">
                    <FaCheckCircle />
                </div>
                <h3>Congratulations! </h3>
                <h3>Your order has been placed successfully.</h3>
                <p className="mt-4 m-0">
                    Redirecting to Home page in {count} second
                    {count > 1 ? "s" : ""}
                </p>
            </div>
        </main>
    );
}
