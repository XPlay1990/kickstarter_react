import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {APP_PATH_OVERVIEW} from "../../../config/AppConstants";
import OAuthLogin from "../components/OAuthLogin";
import LoginForm from "../components/LoginForm";
import {Paper} from "@mui/material";
import {IsAuthenticated} from "../../../util/AppTypes";

// function Login(isAuthenticated: boolean) {
function Login({isAuthenticated}: IsAuthenticated) {
    const navigate = useNavigate()
    // componentDidMount() {
    //     // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    //     // Here we display the error and then remove the error query parameter from the location.
    //     if(this.props.location.state && this.props.location.state.error) {
    //         setTimeout(() => {
    //             Alert.error(this.props.location.state.error, {
    //                 timeout: 5000
    //             });
    //             this.props.history.replace({
    //                 pathname: this.props.location.pathname,
    //                 state: {}
    //             });
    //         }, 100);
    //     }
    // }
    if (isAuthenticated) {
        navigate(APP_PATH_OVERVIEW)
    }

    return (
        <Paper style={{textAlign: "center", width: "50%", padding:"20px"}} elevation={2}>
            <h1 className="login-title">Login to CrowdCoin</h1>
            <OAuthLogin/>
            <div className="or-separator">
                <span className="or-text">OR</span>
            </div>
            <LoginForm/>
            <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
        </Paper>
    );
}

export default Login
