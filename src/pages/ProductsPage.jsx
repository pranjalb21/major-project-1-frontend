import React from "react";
import Products from "../components/Products";
import DesktopFilter from "../components/DesktopFilter";

export default function ProductsPage() {
    return (
        <div className="row">
            <div className="col-md-3 col-lg-2 d-none d-md-block">
                <DesktopFilter />
            </div>
            <div className=" col-md-9 col-12 col-lg-10">
                <Products />
            </div>
        </div>
    );
}
