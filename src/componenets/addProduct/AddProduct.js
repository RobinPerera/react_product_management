import React, { useEffect, useState } from "react";
import "./addproduct.css";
import { getproduct, insertProduct, updateProduct } from "../../services/services";
import { Link, useParams } from "react-router-dom";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import Navbar from "../navbar/navbar";

function AddProduct() {

    const { productId } = useParams();

    const [isUpdate, setIsUpdate] = useState(false);

    const [check, setCheck] = useState(false)

    const [errors, setErrors] = useState({
        product_id: "",
        name: "",
        price: "",
        description: "",
        product_code: "",
        release_date: "",
        image_url: "",
        star_rating: ""
    })

    const [addDetails, setAddDetails] = useState({
        product_name: "",
        price: null,
        description: "",
        product_code: "",
        release_date: "",
        image_url: "",
        star_rating: null,
    });


    const getdata = () => {
        getproduct(productId)
            .then((res) => {
                const records = res.data;

                setIsUpdate(true)
                setAddDetails({
                    ...addDetails,
                    product_id: records.product_id,
                    product_name: records.product_name,
                    price: records.price,
                    description: records.description,
                    product_code: records.product_code,
                    release_date: records.release_date,
                    image_url: records.image_url,
                    star_rating: records.star_rating
                })
            })
            .catch((err) => {
                // Handle error
                setIsUpdate(false);
            });
    };
    useEffect(() => {
        getdata();
    }, [productId]);


    const handleValidation = () => {
        let isValid = true;
        const errors = {};

        Object.keys(addDetails).forEach((key) => {
            if (!addDetails[key]) {
                errors[key] = `${key.replace("_", " ")} is required`;
                isValid = false;
            }
        });

        setErrors(errors);
        console.log("isValid:", isValid);
        return isValid;
    };


    const handleSubmit = (e) => {

        e.preventDefault()

        const isValid = handleValidation()

        if (check && isValid) {
            const confirmAdd = window.confirm(
                "Are you sure you want to add this product?"
            );
            if (confirmAdd) {
                insertProduct(addDetails)
                    .then((res) => {
                        console.log("Product added successfully:", res);
                        window.alert("Product added successfully:");
                        clearHandler()

                        document.getElementById("back").click();
                    })
                    .catch((err) => {
                        console.error("Error adding product:", err.message);
                    });
            }
        }
        else {
            alert("you must fill the all the text box and select the checkbox below")
        }


    };

    const handleUpdate = () => {

        const isValid = handleValidation()

        if (check && isValid) {
            const confirmUpdate = window.confirm(
                "Are you sure you want to update this product?"
            );


            if (confirmUpdate) {
                updateProduct(addDetails, productId).then(
                    (res) => {
                        console.log(addDetails.Price)
                        window.alert("update sucessfully")
                        document.getElementById("back").click();

                    }
                ).catch(
                    (err) => {
                        window.alert(err.message)
                    }
                )
            }
        }

        else {
            alert("you must fill the all the text box and select the checkbox below")
        }

    }



    const handleDateChange = (event) => {
        const selectedDate = event.target.value;

        const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
        console.log(formattedDate);
        setAddDetails({
            ...addDetails,
            release_date: formattedDate,
        });
    };

    const clearHandler = () => {
        setAddDetails({
            product_name: "",
            price: null,
            description: "",
            product_code: "",
            release_date: "",
            image_url: "",
            star_rating: null,
        });
        setCheck(false)
    };


    return (
        <>

            <Navbar />
            <Link to="/products">
                <button type="button" id="back" className="btn backbtn btn-dark "
                    style={{ marginLeft: "50px", marginTop: "20px" }}>
                    Go Back
                </button>
            </Link>

            <div className="container  mt-4">
                <form className="content needs-validation">
                    {isUpdate &&
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Product Id
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={addDetails.product_id} readOnly

                            />
                        </div>

                    }

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"

                            value={addDetails.product_name}
                            onChange={(event) => {

                                setAddDetails({
                                    ...addDetails,
                                    product_name: event.target.value,
                                })
                            }}



                        />

                        <small className="text-danger">{errors.product_name}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={addDetails.price}
                            onChange={(event) => {
                                setAddDetails({
                                    ...addDetails,
                                    price: event.target.value,
                                });
                            }}
                        />
                        <small className="text-danger">{errors.price}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={addDetails.description || ""}
                            onChange={(event) => {
                                setAddDetails({
                                    ...addDetails,
                                    description: event.target.value,
                                });
                            }}
                        />
                        <small className="text-danger">{errors.description}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Product_Code
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={addDetails.product_code || ""}
                            onChange={(event) => {
                                setAddDetails({
                                    ...addDetails,
                                    product_code: event.target.value,
                                });
                            }}
                        />
                        <small className="text-danger">{errors.product_code}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Releasing_Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={addDetails.release_date || ""}
                            onChange={handleDateChange}
                        />
                        <small className="text-danger">{errors.release_date}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            image_url
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={addDetails.image_url || ""}
                            onChange={(event) => {
                                setAddDetails({
                                    ...addDetails,
                                    image_url: event.target.value,
                                });
                            }}

                        // onChange={(event) => console.log(event.target.value)}
                        />
                        <small className="text-danger">{errors.image_url}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Poduct_Rating
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={5}

                            className="form-control"
                            id="exampleInputPassword1"
                            value={addDetails.star_rating || ""}
                            onChange={(event) => {
                                setAddDetails({
                                    ...addDetails,
                                    star_rating: event.target.value,
                                });
                            }}
                        />
                        <small className="text-danger">{errors.star_rating}</small>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"

                            onChange={
                                () => {
                                    setCheck(!check)
                                }
                            }
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Are U sure To <span>{isUpdate ? 'Update' : 'Add'} </span> The Product
                        </label>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary"

                            onClick={isUpdate ? handleUpdate : handleSubmit}>
                            {isUpdate ? "Update" : "Submit"}
                        </button>
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            onClick={
                                clearHandler}
                        >
                            Cancle
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProduct;



