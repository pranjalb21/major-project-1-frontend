import React, { useState } from "react";
import useProduct from "../contexts/ProductContext";

export default function MobileFilter() {
    const { priceFilter, ratingFilter, sortFilter, setFilters } = useProduct();
    return (
        <div className="container mt-2">
            <div className="row mb-2 d-md-none justify-content-center">
                <div className="row">
                    <div className="col-4">
                        <select
                            name="sort"
                            id="sort"
                            className="form-select-sm w-100"
                            value={sortFilter || ""}
                            onChange={(e) =>
                                setFilters({ sort: e.target.value })
                            }
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
                            value={ratingFilter || ""}
                            onChange={(e) =>
                                setFilters({ rating: e.target.value })
                            }
                        >
                            <option value="">Rating</option>
                            <option value={4}>4 Stars & above</option>
                            <option value={3}>3 Stars & above</option>
                            <option value={2}>2 Stars & above</option>
                            <option value={1}>1 Star & above</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <select
                            name="price"
                            id="price"
                            className="form-select-sm w-100"
                            value={priceFilter || ""}
                            onChange={(e) =>
                                setFilters({ price: e.target.value })
                            }
                        >
                            <option value={500}>Price Upto 500</option>
                            <option value={1000}>Price Upto 1000</option>
                            <option value={1500}>Price Upto 1500</option>
                            <option value={2000}>Price Upto 2000</option>
                            <option value={2500}>Price Upto 2500</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
