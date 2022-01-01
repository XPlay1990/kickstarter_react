import React from 'react';
import {Navigate, useLocation, useSearchParams} from 'react-router-dom'
import {APP_PATH_LOGIN, APP_PATH_OVERVIEW, LOCALSTORAGE_AUTHENTICATION} from "../config/AppConstants";

function OAuth2RedirectHandler() {
    const location = useLocation()
    const [searchParams] = useSearchParams();

    // function getUrlParameter(name: string) {
    //     name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    //     const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    //
    //     const results = regex.exec(location.search);
    //     return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    // }

    const token = searchParams.get('token')
    const error = searchParams.get('error')

    if (token) {
        localStorage.setItem(LOCALSTORAGE_AUTHENTICATION, token);
        return <Navigate to={APP_PATH_OVERVIEW} state={{from: location}}/>
    } else {
        return <Navigate to={APP_PATH_LOGIN} state={{from: location, error: error}}/>
    }
}

export default OAuth2RedirectHandler;
