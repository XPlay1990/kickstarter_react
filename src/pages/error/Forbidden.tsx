import React, {Component} from 'react';
import './Error.css';
import errorImage from "../../resources/error/ape.jpg";
import {APP_PATH_LandingPage} from "../../config/AppConstants";
import {Link} from "@mui/material";

class Forbidden extends Component {
    render() {
        return (
            <div className="error-container">
                <img src={errorImage} className="errorImage" alt="" loading={"lazy"}/>
                <h1 className="title">
                    403
                </h1>
                <div className="desc">
                    You are not authorized to view the requested source.
                </div>
                <Link href={APP_PATH_LandingPage}>
                    Go Back
                </Link>
            </div>
        );
    }
}

export default Forbidden;