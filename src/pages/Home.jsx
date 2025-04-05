import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProduct from "../contexts/ProductContext";

export const categories = [
    {
        id: 1,
        name: "beauty",
        image: "https://cdn.thewirecutter.com/wp-content/media/2024/06/drugstorebeautyproducts-2048px-2858.jpg",
    },
    {
        id: 2,
        name: "fragrances",
        image: "https://www.arwenfragrances.com/wp-content/uploads/2020/08/per.png",
    },
    {
        id: 3,
        name: "furniture",
        image: "https://5.imimg.com/data5/SELLER/Default/2021/12/VU/PJ/AP/51665645/all-furniture-product-design.jpg",
    },
    {
        id: 4,
        name: "groceries",
        image: "https://sulabhmart.wordpress.com/wp-content/uploads/2013/07/1-composition-with-variety-of-grocery-products-t-monticello1.jpg",
    },
];
export default function Home() {
    const { fetchCart, fetchWishlist, initialLoad } = useProduct();
    useEffect(() => {
        initialLoad();
    }, []);
    return (
        <main className="container mt-3">
            <section>
                <div className="row">
                    {categories?.map((c) => (
                        <div className="col-3 g-3" key={c.id}>
                            <Link to={`/products?category=${c.name}`}>
                                <div className="card position-relative overflow-hidden">
                                    <img
                                        src={c.image}
                                        alt={c.name}
                                        className="img-fluid "
                                    />
                                    <p
                                        className="position-absolute bg-white top-50  translate-middle-y text-center bg-opacity-75"
                                        style={{ width: "100%" }}
                                    >
                                        {c.name.toUpperCase()}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
            <section className="mt-3">
                <div className="position-relative">
                    <Link to={"/products"}>
                        <img
                            src={`https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                            alt="Products"
                            className="img-fluid"
                        />
                        <p
                            className="position-absolute bg-white top-50  translate-middle-y text-center bg-opacity-75 py-3 text-black"
                            style={{ width: "100%" }}
                        >
                            All Products
                        </p>
                    </Link>
                </div>
            </section>
            <section className="my-3">
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="border bg-secondary-subtle p-3 d-flex">
                            <img
                                src={`https://placehold.co/80x120`}
                                alt=""
                                className="img-fluid"
                            />
                            <div className="px-3">
                                <div>
                                    <small className="">NEW ARRIVAL</small>
                                </div>
                                <div className="mt-3">
                                    <small className="fw-bold">
                                        Summer Collection
                                    </small>
                                    <br />
                                    <small className="">
                                        Check out our best summer collection to
                                        stay warm in style this season
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="border bg-secondary-subtle p-3 d-flex">
                            <img
                                src={`https://placehold.co/80x120`}
                                alt=""
                                className="img-fluid"
                            />
                            <div className="px-3">
                                <div>
                                    <small className="">NEW ARRIVAL</small>
                                </div>
                                <div className="mt-3">
                                    <small className="fw-bold">
                                        Summer Essential
                                    </small>
                                    <br />
                                    <small className="">
                                        Check out our best winter collection to
                                        stay warm in style this season
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
