import React from "react";
import { CiSearch } from "react-icons/ci";
import useProduct from "../contexts/ProductContext";

export default function Search() {
    const { searchKeywordFilter, setSearchKeywordFilter } = useProduct();
    return (
        <div className="px-1 broder border rounded bg-white d-flex ms-md-4 mt-2">
            <div className="align-self-center">
                <CiSearch />
            </div>
            <input
                type="text"
                placeholder="Search"
                className="p-1 border-0 bg-transparent"
                value={searchKeywordFilter}
                onChange={(e) => setSearchKeywordFilter(e.target.value)}
                style={{ outline: "none", width: "100%" }}
            />
        </div>
    );
}
