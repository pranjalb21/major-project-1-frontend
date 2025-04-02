import React from "react";
import useProduct from "../contexts/ProductContext";
import { Link } from "react-router-dom";

export default function Pagination({
    totalPages,
    currentPage,
    setCurrentPage,
}) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li
                    className={`page-item ${
                        currentPage <= 1 ? "disabled" : ""
                    }`}
                    onClick={() => setCurrentPage((currpage) => currpage - 1)}
                >
                    <Link className="page-link">Previous</Link>
                </li>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                        className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        <Link className="page-link" to="#">
                            {index + 1}
                        </Link>
                    </li>
                ))}
                <li
                    className={`page-item ${
                        currentPage >= totalPages ? "disabled" : ""
                    }`}
                    onClick={() => setCurrentPage((currpage) => currpage + 1)}
                >
                    <Link className="page-link px-4" to="#">
                        Next
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
