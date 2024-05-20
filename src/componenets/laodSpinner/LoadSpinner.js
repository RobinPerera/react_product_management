import React from "react";

const LoadingSpinner = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <button class="btn btn-primary" type="button" disabled>
                <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                ></span>
                Loading...
                <p className="ms-3">Please wait...</p>
            </button>
        </div>
    );
};

export default LoadingSpinner;