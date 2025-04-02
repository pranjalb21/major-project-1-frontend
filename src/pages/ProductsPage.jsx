import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import DesktopFilter from "../components/DesktopFilter";
import MobileFilter from "../components/MobileFilter";
import Pagination from "../components/Pagination";
import useProduct from "../contexts/ProductContext";

export default function ProductsPage() {
    const { totalPages } = useProduct();
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div className="row">
            <div className="col-md-3 col-xl-2 d-none d-md-block">
                <DesktopFilter />
            </div>
            <div className="col-md-9 col-12 col-xl-10">
                <div className="d-flex flex-column h-100">
                    <MobileFilter />
                    <Products currentPage={currentPage} />
                    <div className="mt-auto">
                        <Pagination
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
