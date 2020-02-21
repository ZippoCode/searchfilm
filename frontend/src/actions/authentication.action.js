import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
} from '../constants/authentication.constants';

import { requestInfoAccount } from './user.action';
import * as ErrorAction from './error.action';

import { history } from '../helpers/history';

function handleResponse(response) {
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
}

function request(typeRequest) { return { type: typeRequest } };
function failure(typeFailure, errorValue) { return { type: typeFailure, errorValue } }

export function login(username, password) {
    const requestInfo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }

    return dispatch => {

        dispatch(request(LOGIN_REQUEST));
        return fetch('http://127.0.0.1:8000/account/api/auth/login', requestInfo)
            .then(handleResponse)
            .then(user => {
                localStorage.setItem('token', JSON.stringify(user.token));
                dispatch(success(user.token));
                dispatch(requestInfoAccount(user.token));
                history.push('/');
            },
                error => {
                    dispatch(failure(LOGIN_FAILURE, error.toString()));
                    dispatch(ErrorAction.errorLogin(error.toString()));
                });
    };

    function success(token) { return { type: LOGIN_SUCCESS, token } }
}

export function logout(token) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(token));

    var requestOptions = {
        method: 'GET',
        headers: headers,
    };

    return dispatch => {
        dispatch(request(LOGOUT_REQUEST));
        return fetch('http://127.0.0.1:8000/account/api/auth/logout', requestOptions)
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('token');
                    dispatch(success());
                }
                throw new Error('Impossibile effettuare il logout');
            })
            .catch(error => { dispatch(failure(LOGOUT_FAILURE, error.toString())); });

    }

    function success() { return { type: LOGOUT_SUCCESS } }
}

export function changePassword(token, old_password, new_password) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(token));

    var formdata = new FormData();
    formdata.append("old_password", old_password);
    formdata.append("new_password", new_password);

    var requestOptions = {
        method: 'PUT',
        headers: headers,
        body: formdata,
    };

    return dispatch => {
        dispatch(request(CHANGE_PASSWORD_REQUEST));
        return fetch('http://127.0.0.1:8000/account/api/auth/change_password', requestOptions)
            .then(handleResponse)
            .then(dispatch(success()))
            .catch(error => dispatch(failure(CHANGE_PASSWORD_FAILURE, error.toString)))
    }

    function success() { return { type: CHANGE_PASSWORD_SUCCESS } }
}