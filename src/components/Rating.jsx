import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({ rate }) {
    let elements = [];
    for (let i = 1; i <= 5; i++) {
        if (rate >= i) {
            elements.push(<FaStar key={i} />);
        } else if (rate > i - 1) {
            elements.push(<FaStarHalfAlt key={i} />);
        } else {
            elements.push(<FaRegStar key={i} />);
        }

    }
    return (
        <div className="d-flex align-items-center text-warning">
            <small className="text-black me-2">{rate}</small>
            {elements}
        </div>
    );
}
