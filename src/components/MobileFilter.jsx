import React, { useState } from "react";

export default function MobileFilter() {
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [priceRange, setPriceRange] = useState(0);
    return (
        <div className="container mt-2">
            <div className="row mb-2 d-md-none justify-content-center">
                <div className="row">
                    <div className="col-4">
                        <select
                            name="sort"
                            id="sort"
                            className="form-select-sm w-100"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                            <option value="">Price</option>
                            <option value="l2h">Low to High</option>
                            <option value="h2l">High to Low</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <select
                            name="rating"
                            id="rating"
                            className="form-select-sm w-100"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="">Rating</option>
                            <option value="4&U">4 Stars & above</option>
                            <option value="3&U">3 Stars & above</option>
                            <option value="2&U">2 Stars & above</option>
                            <option value="1&U">1 Star & above</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <select
                            name="rating"
                            id="rating"
                            className="form-select-sm w-100"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="">Price Range</option>
                            <option value="1to500">From 1 to 500</option>
                            <option value="501to1000">From 501 to 1000</option>
                            <option value="1001to1500">
                                From 1001 to 1500
                            </option>
                            <option value="1501to2000">
                                From 1501 to 2000
                            </option>
                            <option value="2001to2500">
                                From 2001 to 2500
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
