import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ login }) {
    const [activeLink, setActiveLink] = useState("home");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (login) {
            navigate("/home")
        } else {

            navigate("/login");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a
                className="navbar-brand mx-5 text-uppercase font-weight-bold text-sm-left fs-3 "
                href="#home"
            >
                Product Management App
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto fs-4">
                    <li className={`nav-item ${activeLink === "home" ? "active" : ""}`}>
                        <Link
                            className="nav-link"
                            to="/"
                            onClick={() => setActiveLink("home")}
                        >
                            Home
                        </Link>
                    </li>
                    <li
                        className={`nav-item ${activeLink === "view-products" ? "active" : ""}`}
                        style={{
                            pointerEvents: login ? "auto" : "none",
                            opacity: login ? "1" : "0.6"
                        }

                        }
                    >
                        <Link
                            to="/products"
                            className="nav-link"
                            onClick={() => setActiveLink("view-products")}
                        >
                            View Products
                        </Link>
                    </li>
                </ul>
            </div>
            <form className="d-flex">
                <button type="button" className="btn btn-success btn-lg" onClick={handleLogin}>
                    {login ? 'Logout' : 'Login'}
                </button>
            </form>
        </nav >
    );
}

export default Navbar;
