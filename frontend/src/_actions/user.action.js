import { userConstants } from '../_constants/user.constants';
import { userService } from '../_service/user.service'
import * as ErrorAction from './error.action';

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

function login(username, password) {

    return dispatch => {

        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(ErrorAction.errorLogin(error.toString()));
                });
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout(token) {
    userService.logout(token);
    history.push('/');
    return { type: userConstants.LOGOUT }
}

function changePassword(token, old_password, new_password) {
    return dispatch => {

        dispatch(request({token}));

        userService.change_password(token, old_password, new_password)
            .then(
                user => {
                    dispatch(success(token));
                    logout(token);
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert(error.toString());
                }
            )
    }

    function request(token) { return { type: userConstants.CHANGE_PASSWORD_REQUEST, token } }
    function success() { return { type: userConstants.CHANGE_PASSWORD_SUCCESS, token } }
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
                    dispatch(ErrorAction.errorRegister(error.toString()));
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