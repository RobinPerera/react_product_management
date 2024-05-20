import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../navbar/navbar'

function Registration() {

    const navi = useNavigate()

    const handleregi = () => {

        navi("/login")
    }

    return (
        <>
            <Navbar />
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-md-6 col-lg-4">
                        <div class="card shadow p-4">
                            <h5 class="card-title text-center mb-4">Register Form</h5>
                            <form >
                                <div class="mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Username"
                                    // onChange={(e) => {
                                    //     setname(e.target.value)
                                    // }}
                                    />
                                </div>
                                <div class="mb-3">
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="Password"
                                    // onChange={(e) => {
                                    //     setpassward(e.target.value)
                                    // }}
                                    />
                                </div>

                                <div class="d-grid mb-3">

                                    <button type="button" class="btn btn-primary" onClick={handleregi}>
                                        Register
                                    </button>

                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration