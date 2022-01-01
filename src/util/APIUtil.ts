import {API_BASE_URL, LOCALSTORAGE_AUTHENTICATION} from '../config/AppConstants';
import {LoginRequest, SignupRequest} from "./APITypes";

const request = (options: any) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(LOCALSTORAGE_AUTHENTICATION)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(LOCALSTORAGE_AUTHENTICATION))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if (!localStorage.getItem(LOCALSTORAGE_AUTHENTICATION)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest: LoginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest: SignupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
