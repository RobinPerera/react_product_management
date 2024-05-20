import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../services/services";

import "./Product.css";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../laodSpinner/LoadSpinner";
import Navbar from "../navbar/navbar";



function GetPoducts() {


    const login = useLocation()


    const [products, setProducts] = useState([]);
    const [errorMeassage, setErrorMessage] = useState("");
    const [requestComplete, setrequestComplete] = useState(false);
    const [selectIndex, setSelectIndex] = useState(1);
    const [deleteproduct, setDeleteProduct] = useState();

    const [searchquery, setSearchquery] = useState("")

    const filterArray = ["By Name", "By Price", "By ReleaseDate", "By Rating"];

    const getdata = () => {
        getAllProducts(selectIndex)
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
    }, [selectIndex, deleteproduct]);

    let filter = filterArray.map((item, index) => {
        return <option key={index}>{item}</option>;
    });

    const handleSelectItem = (event) => {
        setSelectIndex(event.target.selectedIndex + 1);
    };

    const deleteHandler = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (confirmDelete) {
            deleteProduct(id)
                .then((res) => {
                    setDeleteProduct({
                        products: products.filter((product) => {
                            return product.product_id !== id;
                        }),
                    });
                })
                .catch((err) => {
                    return err.message;
                });
        }
    };

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

    let filterProdcut = products.filter((product) => {
        return product.product_name.toLowerCase().includes(searchquery.toLowerCase().trim())
    })



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
    }


    else
        design = (
            <>
                <Navbar login={login} />
                <div className="add">
                    <div>
                        <select onChange={handleSelectItem}>
                            <option selected disabled>
                                --Filter Product--
                            </option>
                            {filter}
                        </select>
                    </div>

                    <div><input placeholder="     --search heare--"
                        value={searchquery}
                        onChange={
                            (event) => {
                                setSearchquery(event.target.value)

                            }
                        }></input></div>

                    <div><Link to="/addProduct">
                        <button type="button" className="btn btn-primary btn-lg">
                            Add Products
                        </button>
                    </Link></div>

                </div>

                <br />


                <div className="row product-card row-cols-1 ms-1 row-cols-md-4 g-4 font-monospace me-5">

                    {filterProdcut.map((e) => (
                        <div className="col" id="pdiv" key={e.product_id}>

                            <div
                                className="card h-100 w-100 rounded shadow mx-2"
                                id="product-card"
                            >
                                {/* ProductName */}
                                <div
                                    style={{ height: "45px", backgroundColor: "#000000 " }}
                                    className="row mx-auto w-100 rounded-top"
                                >
                                    <h5 className="card-title text-center text-light pt-2 col-12">
                                        <span style={{ fontSize: "1.6rem" }}>
                                            <b>{e.product_name}</b>
                                        </span>
                                        {/* <span style={{fontSize:'0.9rem'}}>({e.star_rating})</span> */}
                                    </h5>

                                </div>
                                <div className="d-flex justify-content-center align-items-center mt-2">
                                    <Link to={`/view/${e.product_id}`} style={{ TextDecoder: "none" }}>
                                        <img
                                            style={{ maxHeight: '170px' }}
                                            src={e.image_url}
                                            className="card-img-top"
                                            alt={e.product_name}
                                        />
                                    </Link>
                                </div>
                                <div
                                    id="price-tab"
                                    className="card-body d-flex align-items-end fs-5"
                                >
                                    <p className="card-text border-top pt-2">

                                        Price: ${e.price}
                                        <br />
                                        Rating: {handleRating(e.star_rating)}

                                    </p>

                                </div>

                                <div className="text-center mb-2 mt-2">
                                    <Link
                                        to={`/view/${e.product_id}`}
                                        className="btn btn-outline-success mr-2"
                                    >
                                        View
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteHandler(e.product_id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>


                {/* <div className="container mt-3"> 
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>Sl. No.</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image URL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, index) => {
                            return (
                                <tr key={p.product_id}>
                                    <td>{index + 1}

                                    </td>
                                    <td>{p.product_name}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price}</td>
                                    <td>
                                        <Link to={`/view/${p.product_id}`}>
                                            <img
                                                src={p.image_url}
                                                alt="Product"
                                                style={{ maxWidth: "100px", maxHeight: "100px" }}
                                            ></img>
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/view/${p.product_id}`}>
                                            <button
                                                type="button"
                                                className="btn btn-outline-success"
                                            >
                                                View
                                            </button>
                                        </Link>

                                         <Link to={`/addProduct/${p.product_id}`}>
                                                <button type="button" className="btn btn-outline-primary">
                                                    Update
                                                </button>
                                            </Link> 
                 <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    deleteHandler(p.product_id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>  */}





            </>
        );
    return design;
}
export default GetPoducts;

