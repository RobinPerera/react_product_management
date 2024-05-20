import React, { useEffect, useState } from "react";


import "./GetSingle.css";


import { Link, useParams } from "react-router-dom";
import { getproduct } from "../../services/services";
import LoadingSpinner from "../laodSpinner/LoadSpinner";
import Navbar from "../navbar/navbar";

function GetSingleProdcut() {
    const { productId } = useParams();

    const [products, setProducts] = useState([]);
    const [errorMeassage, setErrorMessage] = useState("");
    const [requestComplete, setrequestComplete] = useState(false);

    const getdata = () => {
        getproduct(productId)
            .then((res) => {
                const records = res.data;
                setProducts(records);
                setErrorMessage("");
                setrequestComplete(true);
            })
            .catch((err) => {
                setProducts(undefined);
                setErrorMessage(err.message);
                setrequestComplete(false);
            });
    };
    useEffect(() => {
        getdata();
    }, []);

    const handleRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i key={i} className="fa-solid fa-star" style={{ color: "#ffc107" }}></i>);
            } else {
                stars.push(<i className="fa-regular fa-star"></i>);
            }
        }
        return stars;
    }
    let design;
    if (!requestComplete) {
        design = (
            <div>
                <LoadingSpinner />
            </div>
        );
    } else if (errorMeassage !== "") {
        design = <span>{errorMeassage}</span>;
    } else if (!products || products.length === 0) {
        design = <span>No records</span>;
    } else
        design = (
            <>
                <Navbar />
                <div className="product-container mt-5 " >
                    <div className="product-image ">
                        <img src={products.image_url} alt={products.product_name} />
                    </div>
                    <div className="product-details " style={{ margin: "20px" }}>
                        <p>
                            <span className="product-property">Product ID:</span>{" "}
                            {products.product_id}
                        </p>
                        <p>
                            <span className="product-property">Name:</span>{" "}
                            {products.product_name}
                        </p>
                        <p>
                            <span className="product-property">Price:</span> ${products.price}
                        </p>
                        <p>
                            <span className="product-property">Description:</span>{" "}
                            {products.description}
                        </p>
                        <p>
                            <span className="product-property">Product Code:</span>{" "}
                            {products.product_code}
                        </p>
                        <p>
                            <span className="product-property">ReleaseDate:</span> {products.release_date}
                        </p>
                        <p>
                            <span className="product-property"></span>{" "}
                            {handleRating(products.star_rating)}

                        </p>
                        <Link to={`/addProduct/${products.product_id}`}>
                            <button type="button" className="btn btn-outline-primary"
                            >
                                Edit
                            </button>
                        </Link>
                        <Link to={`/products`}>
                            <button type="button" className="btn btn-outline-warning"
                            >
                                back
                            </button>
                        </Link>
                    </div>
                </div>
            </>
        );
    return design;
}
export default GetSingleProdcut;






