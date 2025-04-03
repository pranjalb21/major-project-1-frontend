import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import DesktopFilter from "../components/DesktopFilter";
import MobileFilter from "../components/MobileFilter";
import Pagination from "../components/Pagination";
import useProduct from "../contexts/ProductContext";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
    const {
        totalPages,
        fetchProduct,
        resetFilter,
        setCategoryFilter,
        setPageFilter,
    } = useProduct();

    // URL state
    const [searchParams] = useSearchParams();
    const loadProduct = async () => {
        let url = `http://localhost:5000/products?`;
        const category = searchParams.getAll("category");
        const rating = searchParams.get("rating");
        const sort = searchParams.get("sort");
        const range = searchParams.get("range");
        const searchKeyword = searchParams.get("searchKeyword");
        const page = searchParams.get("page");
        if (category.length > 0) {
            url += `${category?.map((cat) => `category=${cat}`).join("&")}`;
            setCategoryFilter(category);
        }
        if (page) {
            url += `&page=${page}`;
            setPageFilter(page);
        }
        if (rating) {
            url += `&rating=${rating}`;
        }
        if (sort) {
            url += `&sort=${sort}`;
        }
        if (range) {
            url += `&range=${range}`;
        }
        if (searchKeyword) {
            url += `&searchKeyword=${searchKeyword}`;
        }
        console.log(url);
        fetchProduct(url);
    };
    useEffect(() => {
        loadProduct();
    }, [searchParams]);
    useEffect(() => {
        resetFilter();
    }, []);

    return (
        <div className="row">
            <div className="col-md-3 col-xl-2 d-none d-md-block">
                <DesktopFilter />
            </div>
            <div className="col-md-9 col-12 col-xl-10">
                <div className="d-flex flex-column h-100">
                    <MobileFilter />
                    <Products />
                    <div className="mt-auto">
                        <Pagination totalPages={totalPages} />
                    </div>
                </div>
            </div>
        </div>
    );
}
