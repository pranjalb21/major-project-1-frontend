import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../pages/Home";
import useProduct from "../contexts/ProductContext";

export default function DesktopFilter() {
    const {
        price,
        rating,
        priceRange,
        category,
        setPrice,
        setRating,
        setPriceRange,
        setCategory,
        resetFilter,
    } = useProduct();
    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategory((prev) => [...prev, value]);
        } else {
            const newCategory = category.filter((c) => c != value);
            setCategory(newCategory);
        }
    };
    return (
        <div className="w-100 h-100 bg-white p-2">
            <div>
                <p className="d-flex fs-5 fw-bold">
                    Filters{" "}
                    <Link
                        className="ms-auto fw-normal fs-6 align-self-end"
                        onClick={resetFilter}
                    >
                        Clear
                    </Link>
                </p>
            </div>
            <hr className="m-0 mt-2 mb-1" />
            <div>
                <label className="form-label fw-bold fs-6">Price</label>
                <div>
                    <input
                        type="range"
                        name="priceRange"
                        id="priceRange"
                        min={0}
                        max={2500}
                        step={1}
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-100"
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="priceRange"
                        id="priceRange"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="form-control-sm border-1 w-50 ms-1"
                    />
                </div>
            </div>
            <hr className="m-0 mt-2 mb-1" />
            <div className="">
                <label htmlFor="" className="form-label fw-bold fs-6">
                    Category
                </label>
                {categories.map((category) => (
                    <div className="form-check ms-3" key={category.id}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={category.name}
                            name="category"
                            onChange={(e)=>{
                                handleCategoryChange(e)
                                console.log(category);
                            }}
                            value={category.name}
                        />
                        <label
                            className="form-check-label text-capitalize"
                            htmlFor={category.name}
                        >
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>
            <hr className="m-0 mt-2 mb-1" />
            <div className="">
                <label htmlFor="" className="form-label fw-bold fs-6">
                    Rating
                </label>
                <div className="form-check ms-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortByRatings"
                        id="rating1"
                        value="4&U"
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="rating1">
                        4 Stars & above
                    </label>
                </div>
                <div className="form-check ms-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortByRatings"
                        id="rating2"
                        value="3&U"
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="rating2">
                        3 Stars & above
                    </label>
                </div>
                <div className="form-check ms-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortByRatings"
                        id="rating3"
                        value="2&U"
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="rating3">
                        2 Stars & above
                    </label>
                </div>
                <div className="form-check ms-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortByRatings"
                        id="rating4"
                        value="1&U"
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="rating4">
                        1 Star & above
                    </label>
                </div>
            </div>
            <hr className="m-0 mt-2 mb-1" />
            <div className="">
                <label htmlFor="" className="form-label fw-bold fs-6">
                    Sort By
                </label>
                <div className="form-check ms-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="price"
                        id="pricel2h"
                        value={"l2h"}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="pricel2h">
                        Price - Low to High
                    </label>
                </div>
                <div className="form-check ms-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="price"
                        id="priceh2l"
                        value={"h2l"}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="priceh2l">
                        Price - High to Low
                    </label>
                </div>
            </div>
        </div>
    );
}
