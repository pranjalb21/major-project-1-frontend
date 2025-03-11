import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";

const addressData = [
    {
        id: 1,
        street: "123 Street",
        city: "345 City",
        state: "678 State",
        pin: 123456,
        isPrimary: false,
    },
    {
        id: 2,
        street: "123 Street",
        city: "345 City",
        state: "678 State",
        pin: 123456,
        isPrimary: true,
    },
    {
        id: 3,
        street: "123 Street",
        city: "345 City",
        state: "678 State",
        pin: 123456,
        isPrimary: false,
    },
];

export default function Profile() {
    const [addresses, setAddresses] = useState(addressData);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddressData, setNewAddressData] = useState({
        street: "",
        city: "",
        state: "",
        pin: "",
    });

    const handleShowAddForm = () => {
        if (!showAddForm) {
            setShowAddForm(true);
            setNewAddressData({
                street: "",
                city: "",
                state: "",
                pin: "",
            });
        }
    };

    const handleCancelShowAddForm = () => {
        if (showAddForm) {
            setShowAddForm(false);
            setNewAddressData({
                street: "",
                city: "",
                state: "",
                pin: "",
            });
        }
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        const data = {
            ...newAddressData,
            id: addresses.length + 1,
            isPrimary: false,
        };
        const newAddressArr = [...addresses, data];
        setAddresses(newAddressArr);
        setShowAddForm(false);
        setNewAddressData({
            street: "",
            city: "",
            state: "",
            pin: "",
        });
    };

    const handlePrimaryAddress = (addressId) => {
        const newAddresses = addresses.map((a) =>
            a.id == addressId ? { ...a, isPrimary: !a.isPrimary } : a
        );
        setAddresses(newAddresses);
    };
    return (
        <main className="d-flex justify-content-center">
            <div className="container mt-3 mb-4 bg-white p-3">
                <section>
                    <form className="">
                        <h4 className="fs-5">Profile Details</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label ">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    readOnly
                                    value={"John Doe"}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    disabled
                                    readOnly
                                    value={"test@email.com"}
                                />
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-6">
                                <label htmlFor="dob" className="form-label">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    disabled
                                    readOnly
                                    value="2000-01-01"
                                />
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="phoneNumber"
                                    className="form-label"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    disabled
                                    readOnly
                                    value={"1234567890"}
                                />
                            </div>
                        </div>
                    </form>
                </section>
                <hr />
                <section>
                    <div className="d-flex justify-content-between">
                        <h4 className="fs-5">
                            Saved Addresses{" "}
                            <small className="fw-normal">
                                (<i>select your primary address</i>)
                            </small>
                        </h4>
                        <button
                            className="btn btn-success btn-sm align-self-start"
                            onClick={handleShowAddForm}
                        >
                            Add New <CiSquarePlus />
                        </button>
                    </div>
                    <ul className="list-group mt-1">
                        {addresses.map((a) => (
                            <li className="list-group-item " key={a.id}>
                                <div className="form-check position-relative d-flex">
                                    <input
                                        className="form-check-input align-self-center"
                                        type="radio"
                                        id="flexCheckIndeterminate"
                                        name="selectedAddress"
                                        checked={a.isPrimary}
                                        onChange={() =>
                                            handlePrimaryAddress(a.id)
                                        }
                                    />
                                    <p className="m-0 ms-2">
                                        {a.street}, {a.city} <br />
                                        {a.state}, {a.pin}
                                    </p>
                                    <div className="btn btn-danger btn-sm ms-auto align-self-center">
                                        <MdOutlineDeleteOutline />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                {showAddForm && (
                    <section>
                        <form className="mt-3" onSubmit={handleSaveAddress}>
                            <hr />
                            <h5>Add new address</h5>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label
                                        htmlFor="street"
                                        className="form-label"
                                    >
                                        Street Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="street"
                                        name="street"
                                        value={newAddressData.street}
                                        onChange={(e) =>
                                            setNewAddressData({
                                                ...newAddressData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label
                                        htmlFor="city"
                                        className="form-label"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        name="city"
                                        value={newAddressData.city}
                                        onChange={(e) =>
                                            setNewAddressData({
                                                ...newAddressData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label
                                        htmlFor="state"
                                        className="form-label"
                                    >
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        name="state"
                                        value={newAddressData.state}
                                        onChange={(e) =>
                                            setNewAddressData({
                                                ...newAddressData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="pin" className="form-label">
                                        Pin
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="pin"
                                        name="pin"
                                        value={newAddressData.pin}
                                        onChange={(e) =>
                                            setNewAddressData({
                                                ...newAddressData,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6 d-grid">
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleCancelShowAddForm}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="col-md-6 d-grid">
                                    <button className="btn btn-success">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                )}
            </div>
        </main>
    );
}
