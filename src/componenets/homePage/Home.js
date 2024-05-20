import React, { useState } from "react";
import "./HomePage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";


function HomePage({ login }) {

    const navi = useNavigate()
    const viewProducts = () => {

        navi("/login")


    }

    return (
        <>
            <Navbar login={login} />
            <div className="container center-div">
                <div className="row">
                    <div className="text-center mx-auto ">
                        <h1>Welcome to Product Management App</h1>

                        <button type="button" className="btn btn-outline-primary mt-10" onClick={viewProducts}>
                            Continue <i className="fa fa-arrow-right"></i>
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
