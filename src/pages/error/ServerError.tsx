import React from 'react';
import './ServerError.css';
import {APP_PATH_LandingPage} from "../../config/AppConstants";
import {Link} from "@mui/material";

interface Input {
    errorCode: number,
    errorResponse: string
}

function ServerError(input: Input) {
    return (
        <div className="error-container">
            <h1 className="server-error-title">
                {input.errorCode} - {input.errorResponse}
            </h1>
            <div className="server-error-desc">
                Oops! Something went wrong at our Server. Why don't you go back?
            </div>
            <Link href={APP_PATH_LandingPage}>
                Go Back
            </Link>
        </div>
    );
}

export default ServerError;