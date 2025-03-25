import React, { useState } from "react";

export default function MobileFilter() {
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [priceRange, setPriceRange] = useState(0);
    return (
        <div className="container">
            <div className="row g-3 mb-2 d-md-none">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="sort" className="form-label">
                                Sort By Price:
                            </label>
                            <select
                                name="sort"
                                id="sort"
                                className="form-select-sm"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="l2h">Low to High</option>
                                <option value="h2l">High to Low</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="rating" className="form-label">
                                Sort By Rating:
                            </label>
                            <select
                                name="rating"
                                id="rating"
                                className="form-select-sm"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="4&U">4 Stars & above</option>
                                <option value="3&U">3 Stars & above</option>
                                <option value="2&U">2 Stars & above</option>
                                <option value="1&U">1 Star & above</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="px-3">
                        <label for="customRange3" className="form-label">
                            Select Price Range:
                        </label>
                        <div className="row">
                            <div className="col align-self-center">
                                <input
                                    type="range"
                                    className="form-range-sm"
                                    min="0"
                                    max="2500"
                                    step="1"
                                    id="customRange3"
                                    value={priceRange}
                                    onChange={(e) =>
                                        setPriceRange(e.target.value)
                                    }
                                />
                                <input
                                    type="number"
                                    style={{ width: "4rem" }}
                                    value={priceRange}
                                    onChange={(e) =>
                                        setPriceRange(e.target.value)
                                    }
                                    className="form-control-sm border-1 align-self-center ms-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
