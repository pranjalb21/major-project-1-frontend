import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import useProduct from "../contexts/ProductContext";
import { BiEdit } from "react-icons/bi";

export default function Profile() {
    const defaultAddress = {
        street: "",
        city: "",
        state: "",
        pin: "",
    };
    const {
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        fetchAddress,
    } = useProduct();
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddressData, setNewAddressData] = useState({
        street: "",
        city: "",
        state: "",
        pin: "",
    });
    const [error, setError] = useState();

    const handleShowAddForm = () => {
        setShowAddForm(true);
        setNewAddressData(defaultAddress);
        setError(null);
    };

    const handelEditAddress = (addressData) => {
        setShowAddForm(true);
        setError(null);
        setNewAddressData({
            id: addressData._id,
            street: addressData.street,
            city: addressData.city,
            state: addressData.state,
            pin: addressData.pin,
            isPrimary: addressData.isPrimary,
        });
    };

    const handleCancelShowAddForm = () => {
        if (showAddForm) {
            setShowAddForm(false);
            setNewAddressData(defaultAddress);
            setError(null);
        }
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        if (
            !newAddressData.street ||
            !newAddressData.city ||
            !newAddressData.state ||
            !newAddressData.pin
        ) {
            setError("All details are required.");
        } else {
            setError(null);

            if (newAddressData.id) {
                const data = {
                    street: newAddressData.street,
                    city: newAddressData.city,
                    state: newAddressData.state,
                    pin: newAddressData.pin,
                    isPrimary: newAddressData.isPrimary,
                };
                updateAddress(newAddressData.id, data);
            } else {
                const data = {
                    street: newAddressData.street,
                    city: newAddressData.city,
                    state: newAddressData.state,
                    pin: newAddressData.pin,
                };
                addAddress(data);
            }
            setShowAddForm(false);
            setNewAddressData(defaultAddress);
            setError(null);
        }
    };
    useEffect(() => {
        fetchAddress();
        document.title = TITLE + "Profile";

    }, []);
    return (
        <main className="d-flex justify-content-center">
            <div className="container mt-3 mb-4 bg-white p-3 shadow">
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
                        <h4 className="fs-5">Saved Addresses</h4>
                        <button
                            className="btn btn-success btn-sm align-self-start"
                            onClick={handleShowAddForm}
                        >
                            Add New <CiSquarePlus />
                        </button>
                    </div>
                    <ul className="list-group mt-1">
                        {addresses?.map((a) => (
                            <li className="list-group-item " key={a._id}>
                                <div className="position-relative d-flex">
                                    <p className="m-0">
                                        {a.street}, {a.city} <br />
                                        {a.state}, {a.pin}
                                    </p>
                                    <div className="ms-auto align-self-center">
                                        <div className="btn btn-info btn-sm align-self-center">
                                            <BiEdit
                                                onClick={() =>
                                                    handelEditAddress(a)
                                                }
                                            />
                                        </div>
                                        <div className="btn btn-danger btn-sm ms-2 align-self-center">
                                            <MdOutlineDeleteOutline
                                                onClick={() =>
                                                    deleteAddress(a._id)
                                                }
                                            />
                                        </div>
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
                            <h5>
                                {newAddressData.id ? "Update " : "Add new "}
                                address
                            </h5>
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
                                {error && (
                                    <p className="text-danger">*{error}</p>
                                )}
                            </div>
                            <div className="row mt-2 g-2">
                                <div className="col-md-6 d-grid">
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleCancelShowAddForm}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="col-md-6 d-grid">
                                    <button
                                        className="btn btn-success"
                                        type="submit"
                                    >
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
