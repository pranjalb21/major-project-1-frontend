import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useProduct from "../contexts/ProductContext";

export default function Pagination() {
    const { totalPages, loading, pageFilter, setFilters } = useProduct();
    const handlePageNumber = (page) => {
        if (page > 1) {
            setFilters({ page: page || 1 });
        }
    };

    return !loading && totalPages > 1 ? (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li
                    className={`page-item page-link ${
                        pageFilter <= 1 ? "disabled" : ""
                    }`}
                >
                    Previous
                </li>

                {Array.from({ length: totalPages }, (_, index) => {
                    return (
                        <li
                            className={`page-link page-item ${
                                index + 1 === pageFilter ? "active" : ""
                            }`}
                            key={index + 1}
                            onClick={() => handlePageNumber(index + 1)}
                        >
                            {index + 1}
                        </li>
                    );
                })}
                <li
                    className={`page-item page-link ${
                        pageFilter >= totalPages ? "disabled" : ""
                    }`}
                >
                    Next
                </li>
            </ul>
        </nav>
    ) : (
        ""
    );
}
