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
                    <nav class="navbar navbar-expand-lg navbar-light">
                        <div class="container-fluid">
                            <NavLink className="navbar-brand" to="/">
                                MyShopping
                            </NavLink>
                            <button
                                class="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div
                                class="collapse navbar-collapse justify-content-end"
                                id="navbarNav"
                            >
                                <ul class="navbar-nav">
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
            {/* <nav className="navbar navbar-expand-md navbar-light">
                <div className="container-fluid px-5">
                    <NavLink className="navbar-brand" to="/">
                        MyShopping
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll"
                        aria-controls="navbarScroll"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <Search />

                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll ms-auto">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link ms-2"
                                    to="/profile"
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link ms-2" to="/order">
                                    Order
                                </NavLink>
                            </li>
                            <li className="nav-item ms-2">
                                <NavLink className="nav-link" to="/wishlist">
                                    Wishlist
                                    {wishlistTotalCount &&
                                    wishlistTotalCount > 0 ? (
                                        <CountPill count={wishlistTotalCount} />
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
                                    {cartTotalCount && cartTotalCount > 0 ? (
                                        <CountPill count={cartTotalCount} />
                                    ) : (
                                        ""
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
            <hr className="p-0 m-0" />
        </>
    );
}
