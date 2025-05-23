import React, { useEffect } from "react";
import Products from "../components/Products";
import DesktopFilter from "../components/DesktopFilter";
import MobileFilter from "../components/MobileFilter";
import Pagination from "../components/Pagination";
import useProduct from "../contexts/ProductContext";
import { BASE_URL, TITLE } from "../lib/constants";

export default function ProductsPage() {
    const { searchParams, fetchProduct, totalPages } = useProduct();
    const createUrl = () => {
        const baseUrl = `${BASE_URL}/products`;
        const queryString = searchParams.toString();

        return `${baseUrl}?${queryString}`;
    };
    const loadProduct = async () => {
        const url = createUrl();
        await fetchProduct(url);
    };

    useEffect(() => {
        loadProduct();
    }, [searchParams]);
    useEffect(() => {
        document.title = TITLE + "Products";
    }, []);
    return (
        <div className="row">
            {/* Sidebar Filter */}
            <div className="col-md-3 col-xl-2 d-none d-md-block">
                <DesktopFilter />
            </div>

            {/* Main Content */}
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
