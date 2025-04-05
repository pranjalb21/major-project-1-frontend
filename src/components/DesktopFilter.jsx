import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../pages/Home";
import useProduct from "../contexts/ProductContext";

export default function DesktopFilter() {
    const {
        searchParams,
        categoryFilter,
        priceFilter,
        ratingFilter,
        sortFilter,
        searchTextFilter,
        setFilters,
        resetFilter,
    } = useProduct();

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target; // Correctly destructure value and checked
        let categoryList = [...categoryFilter]; // Copy the current category filter to avoid mutating state directly

        if (checked) {
            categoryList.push(value); // Add the category if checked
        } else {
            categoryList = categoryList.filter((c) => c !== value); // Remove the category if unchecked
        }

        setFilters({ category: categoryList });
    };

    return (
        <div className="w-100 h-100 bg-white p-2">
            {/* Filters Header */}
            <div>
                <p className="d-flex fs-5 fw-bold">
                    Filters
                    <Link
                        to={"/products"}
                        className="ms-auto fw-normal fs-6 align-self-end btn btn-link"
                        onClick={resetFilter}
                    >
                        Clear
                    </Link>
                </p>
            </div>
            <hr className="m-0 mt-2 mb-1" />

            {/* Price Filter */}
            <div>
                <label className="form-label fw-bold fs-6">Price</label>
                <input
                    type="range"
                    min={0}
                    max={2500}
                    step={1}
                    className="w-100"
                    value={priceFilter}
                    onChange={(e) => setFilters({ price: e.target.value })}
                />
                <input
                    type="number"
                    name="priceRange"
                    id="priceRange"
                    className="form-control-sm border-1 w-50 ms-1"
                    value={priceFilter}
                    onChange={(e) => setFilters({ price: e.target.value })}
                />
            </div>
            <hr className="m-0 mt-2 mb-1" />

            {/* Category Filter */}
            <div>
                <label className="form-label fw-bold fs-6">Category</label>
                {categories.map((category) => (
                    <div className="form-check ms-3" key={category.name}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={category.name}
                            id={`category-${category.name}`}
                            checked={categoryFilter.includes(category.name)}
                            onChange={handleCategoryChange}
                        />
                        <label
                            className="form-check-label text-capitalize"
                            htmlFor={`category-${category.name}`}
                        >
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>
            <hr className="m-0 mt-2 mb-1" />

            {/* Rating Filter */}
            <div>
                <label className="form-label fw-bold fs-6">Rating</label>
                {[4, 3, 2, 1].map((rating) => (
                    <div className="form-check ms-3" key={rating}>
                        <input
                            type="radio"
                            name="rating"
                            value={`${rating}`}
                            id={`rating-${rating}`}
                            className="form-check-input"
                            checked={ratingFilter == `${rating}`}
                            onChange={(e) => {
                                setFilters({ rating: e.target.value });
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`rating-${rating}`}
                        >{`${rating} Stars & above`}</label>
                    </div>
                ))}
            </div>
            <hr className="m-0 mt-2 mb-1" />

            {/* Sort Filter */}
            <div>
                <label className="form-label fw-bold fs-6">Sort By</label>
                <div className="form-check ms-3">
                    <input
                        type="radio"
                        name="sort"
                        value="l2h"
                        className="form-check-input"
                        id={`l2h`}
                        checked={sortFilter === "l2h"}
                        onChange={() => setFilters({ sort: "l2h" })}
                    />
                    <label className="form-check-label" htmlFor="l2h">
                        Price - Low to High
                    </label>
                </div>
                <div className="form-check ms-3">
                    <input
                        type="radio"
                        name="sort"
                        value="h2l"
                        className="form-check-input"
                        id={`h2l`}
                        checked={sortFilter === "h2l"}
                        onChange={() => setFilters({ sort: "h2l" })}
                    />
                    <label className="form-check-label" htmlFor="h2l">
                        Price - High to Low
                    </label>
                </div>
            </div>
        </div>
    );
}
