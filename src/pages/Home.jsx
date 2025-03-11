import React from "react";
import { Link } from "react-router-dom";

const categories = ["beauty", "fragrances", "furniture", "groceries"];
export default function Home() {
    return (
        <main className="container mt-3">
            <section>
                <div className="row">
                    {categories.map((c, i) => (
                        <div className="col-3 g-3" key={i}>
                            <Link to={`/products/${c}`}>
                                <div className="card position-relative">
                                    <img
                                        src={`https://placehold.co/400x300`}
                                        alt=""
                                        className="card-img-top img-fluid"
                                    />
                                    <p
                                        className="position-absolute bg-white top-50  translate-middle-y text-center bg-opacity-50"
                                        style={{ width: "100%" }}
                                    >
                                        {c.toUpperCase()}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
            <section className="mt-3">
                <div className="">
                    <Link to={"/products/all"}>
                        <img
                            src={`https://placehold.co/1400x600?text=All+Products`}
                            alt="Products"
                            className="img-fluid"
                        />
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
