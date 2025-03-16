import React from "react";

export default function Spinner() {
    return (
        <div
            style={{ width: "100%", height: "100vh" }}
            className="bg-light text-center position-absolute z-3 bg-opacity-50"
        >
            <div
                className="spinner-border position-absolute top-50"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
