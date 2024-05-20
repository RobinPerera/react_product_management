import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



function Login() {



    const [login, setLogin] = useState(true)
    const navi = useNavigate()

    const [name, setname] = useState("")
    const [passward, setpassward] = useState("")

    const viewproducts = () => {

        if (name === "robin" && passward === "robin123") {

            navi('/products', { state: login })

        }
        else {
            alert("username or passward is incorrect")
        }


    }

    return (
        <>

            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-md-6 col-lg-4">
                        <div class="card shadow p-4">
                            <h5 class="card-title text-center mb-4">Login</h5>
                            <form >
                                <div class="mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Username"
                                        onChange={(e) => {
                                            setname(e.target.value)
                                        }}
                                    />
                                </div>
                                <div class="mb-3">
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="Password"
                                        onChange={(e) => {
                                            setpassward(e.target.value)
                                        }}
                                    />
                                </div>
                                <div class="d-grid mb-3">

                                    <button type="button" class="btn btn-primary" onClick={viewproducts}>
                                        Login
                                    </button>

                                </div>
                            </form>
                            <p class="text-center mb-0">
                                Don't have an account?{" "}
                                <Link to="/register">
                                    <a class="text-primary">
                                        Create Account
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>



    )
}

export default Login