import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import CountPill from "./CountPill";
import useProduct from "../contexts/ProductContext";

export default function Navbar() {
    const { fetchCart, fetchWishlist, wishlistTotalCount, cartTotalCount } =
        useProduct();

    useEffect(() => {
        fetchCart();
        fetchWishlist();
    }, []);
    return (
        <>
            <header>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to="/">
                                MyShopping
                            </NavLink>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-end"
                                id="navbarNav"
                            >
                                <ul className="navbar-nav">
                                    <Search />

                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link ms-2"
                                            to="/profile"
                                        >
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link ms-2"
                                            to="/order"
                                        >
                                            Order
                                        </NavLink>
                                    </li>
                                    <li className="nav-item ms-2">
                                        <NavLink
                                            className="nav-link"
                                            to="/wishlist"
                                        >
                                            Wishlist
                                            {wishlistTotalCount &&
                                            wishlistTotalCount > 0 ? (
                                                <CountPill
                                                    count={wishlistTotalCount}
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </NavLink>
                                    </li>
                                    <li className="nav-item ms-2">
                                        <NavLink
                                            className="nav-link position-relative"
                                            to="/cart"
                                        >
                                            Cart
                                            {cartTotalCount &&
                                            cartTotalCount > 0 ? (
                                                <CountPill
                                                    count={cartTotalCount}
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <hr className="p-0 m-0" />
        </>
    );
}
