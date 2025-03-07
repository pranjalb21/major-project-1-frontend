import React from "react";

export default function CountPill({count}) {
    return (
        <span className="position-absolute ms-2 translate-middle badge rounded-pill bg-danger">
            {count}<span className="visually-hidden">unread messages</span>
        </span>
    );
}
