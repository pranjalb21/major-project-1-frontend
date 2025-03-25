import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DesktopFilter() {
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [priceRange, setPriceRange] = useState(0);
    return (
        <div className="w-full h-100 bg-white p-2">
            <p className="d-flex fs-5 fw-medium">
                Filters{" "}
                <Link className="ms-auto fw-normal fs-6 align-self-end">
                    Clear
                </Link>
            </p>
            <div>
                <p>Price:</p>
                <div className="d-flex flex-wrap">
                    <input
                        type="range"
                        name="priceRange"
                        id="priceRange"
                        min={0}
                        max={2500}
                        step={1}
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <input
                        type="number"
                        name="priceRange"
                        id="priceRange"
                        value={priceRange}
                        className="form-control-sm border-1 w-25 ms-1"
                    />
                </div>
            </div>
        </div>
    );
}
