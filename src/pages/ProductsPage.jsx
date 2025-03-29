import React from "react";
import Products from "../components/Products";
import DesktopFilter from "../components/DesktopFilter";
import MobileFilter from "../components/MobileFilter";
import Pagination from "../components/Pagination";

export default function ProductsPage() {
    return (
        <div className="row">
            <div className="col-md-3 col-xl-2 d-none d-md-block">
                <DesktopFilter />
            </div>
            <div className="col-md-9 col-12 col-xl-10">
                <MobileFilter />
                <Products />
                <Pagination totalPages={4} />
            </div>
        </div>
    );
}
