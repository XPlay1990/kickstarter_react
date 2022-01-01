import React from 'react';
import {Box} from "@mui/material";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL, OKTA_AUTH_URL} from "../../../config/AppConstants";
import googleLogo from '../../../resources/oauth/google-logo.png'
import fbLogo from '../../../resources/oauth/fb-logo.png'
import githubLogo from '../../../resources/oauth/github-logo.png'
import './OAuthLogin.css'

function OAuthLogin() {

    return (
        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google" className={"OAuthImg"}/> Log in with Google</a>
            <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                <img src={fbLogo} alt="Facebook" className={"OAuthImg"}/> Log in with Facebook</a>
            <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                <img src={githubLogo} alt="Github" className={"OAuthImg"}/> Log in with Github</a>
            <a className="btn btn-block social-btn Okta" href={OKTA_AUTH_URL}>
                <img src={githubLogo} alt="Github" className={"OAuthImg"}/> Log in with Okta</a>
        </Box>
    );
}

export default OAuthLogin
