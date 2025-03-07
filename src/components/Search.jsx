import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Search() {
    return (
        <div className="px-1 broder border rounded bg-white d-flex ms-md-4 mt-2">
            <div className="align-self-center">
                <CiSearch />
            </div>
            <input
                type="text"
                placeholder="Search"
                className="p-1 border-0 bg-transparent"
                style={{ outline: "none",width:"100%" }}
            />
        </div>
    );
}
