import React, { useEffect, useState } from "react";
import useProduct from "../contexts/ProductContext";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Products({ currentPage }) {
    // Parse query parameters
    const [queryParams, setQueryParams] = useSearchParams();
    const page = queryParams.get("page");
    const category = queryParams.getAll("category");
    const rating = queryParams.get("rating");
    const sort = queryParams.get("sort");
    const range = queryParams.get("range");
    const searchKeyword = queryParams.get("searchKeyword");
    console.log(category);

    const {
        productList,
        setRating,
        setRange,
        setCategory,
        setSearchKeyword,
        setPage,
        setSort,
    } = useProduct();



    return (
        <div className="container mt-3">
            <div className="row g-3">
                {productList?.map((p) => (
                    <ProductCard product={p} key={p._id} />
                ))}
            </div>
        </div>
    );
}
