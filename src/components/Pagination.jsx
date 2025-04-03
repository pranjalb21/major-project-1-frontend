import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Pagination({ totalPages }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        parseInt(searchParams.get("page")) || 1 // Ensure a valid number
    );

    const decreasePage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                page: newPage,
            });
        }
    };

    const increasePage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                page: newPage,
            });
        }
    };

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: currentPage });
        }
    }, [searchParams, setSearchParams, currentPage]);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {/* Previous Page */}
                <li
                    className={`page-item ${
                        currentPage <= 1 ? "disabled" : ""
                    }`}
                    onClick={decreasePage}
                >
                    <Link
                        className="page-link"
                        to={`?${new URLSearchParams({
                            ...Object.fromEntries(searchParams.entries()),
                            page: currentPage - 1,
                        }).toString()}`}
                    >
                        Previous
                    </Link>
                </li>

                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                        className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => {
                            const newPage = index + 1;
                            setCurrentPage(newPage);
                            setSearchParams({
                                ...Object.fromEntries(searchParams.entries()),
                                page: newPage,
                            });
                        }}
                    >
                        <Link
                            className="page-link"
                            to={`?${new URLSearchParams({
                                ...Object.fromEntries(searchParams.entries()),
                                page: index + 1,
                            }).toString()}`}
                        >
                            {index + 1}
                        </Link>
                    </li>
                ))}

                {/* Next Page */}
                <li
                    className={`page-item ${
                        currentPage >= totalPages ? "disabled" : ""
                    }`}
                    onClick={increasePage}
                >
                    <Link
                        className="page-link px-4"
                        to={`?${new URLSearchParams({
                            ...Object.fromEntries(searchParams.entries()),
                            page: currentPage + 1,
                        }).toString()}`}
                    >
                        Next
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
