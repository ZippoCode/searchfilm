import { userConstants } from '../_constants/user.constants';
import { userService } from '../_service/user.service'

import { history } from '../_helpers/history';

export const userActions = {
    login,
    logout,
    changePassword,
    register,
    add_to_favorites,
    remove_to_favorites,
    add_vote,
    remove_vote
}

const PATH_LOGIN = 'http://127.0.0.1:8000/account/api/auth/login';


function login(username, password) {

    return dispatch => {

        dispatch(request({ username }));

        const requestInfo = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }
        
        return fetch(PATH_LOGIN, requestInfo)
            .then(handleResponse)
            .then(
                user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(success(user));
                    history.goBack();
                },
                error => { dispatch(failure(error.toString)) }
            )
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout(token) {
    console.log(token);
    userService.logout(token);
    history.push('/');
    return { type: userConstants.LOGOUT }
}

function changePassword(user, old_password, new_password) {
    console.log(user, old_password, new_password);
    return dispatch => {

        dispatch(request(user));

        const { token } = user;
        userService.change_password(token, old_password, new_password)
            .then(
                user => {
                    dispatch(success());
                    userService.logout(token);
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString))
                    dispatch(alert(error.toString()));
                }
            )
    }

    function request(user) { return { type: userConstants.CHANGE_PASSWORD_REQUEST, user } }
    function success() { return { type: userConstants.LOGOUT } }
    function failure(error) { return { type: userConstants.CHANGE_PASSWORD_FAILURE, error } }
}

function register(user) {

    return dispatch => {

        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('Error: '.concat(error.status));
                }
            )
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function add_to_favorites(user, id_movie) {
    return dispatch => {

        dispatch(request(user));

        userService.put_favorite(user, id_movie)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('Error: '.concat(error.status));
                });

        function request(user) { return { type: userConstants.ADD_PREFERITE_REQUEST, user } }
        function success(user) { return { type: userConstants.ADD_PREFERITE_SUCCESS, user } }
        function failure(error) { return { type: userConstants.ADD_PREFERITE_FAILURE, error } }
    }
}

function remove_to_favorites(user, id_movie) {
    return dispatch => {

        dispatch(request(user));

        userService.remove_favorite(user, id_movie)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('Error: '.concat(error.status));
                });

        function request(user) { return { type: userConstants.ADD_PREFERITE_REQUEST, user } }
        function success(user) { return { type: userConstants.ADD_PREFERITE_SUCCESS, user } }
        function failure(error) { return { type: userConstants.ADD_PREFERITE_FAILURE, error } }
    }
}


function add_vote(user, id_movie, value_vote) {
    return dispatch => {
        dispatch(request(user));

        userService.add_vote(user, id_movie, value_vote)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('Error: '.concat(error.status));
                });

        function request(user) { return { type: userConstants.ADD_VOTE_REQUEST, user } }
        function success(user) { return { type: userConstants.ADD_VOTE_SUCCESS, user } }
        function failure(error) { return { type: userConstants.ADD_VOTE_FAILURE, error } }
    }
}

function remove_vote(user, id_movie) {
    return dispatch => {

        dispatch(request(user));

        userService.remove_vote(user, id_movie)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('Error: '.concat(error.status));
                });

        function request(user) { return { type: userConstants.REMOVE_VOTE_REQUEST, user } }
        function success(user) { return { type: userConstants.REMOVE_VOTE_SUCCESS, user } }
        function failure(error) { return { type: userConstants.REMOVE_VOTE_FAILURE, error } }
    }
}

function handleResponse(response) {
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 400) {
                    logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}