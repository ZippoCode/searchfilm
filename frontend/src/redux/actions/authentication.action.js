import axios from 'axios';
import PropTypes from 'prop-types';

// Importing history
import { history } from '../../helpers/history';

import {
    ActionConstants,
    ErrorsType
} from '../constants/authentication.constants';

import * as URL from '../../helpers/matcher';

export const AuthenticationActions = {
    login,
    logout,
    changePassword,
    getInfoAccount,
    setMoviePreferite,
    voteMovie
}

function failure(typeFailure, errorValue) {
    return {
        type: ActionConstants.ERROR_REQUEST,
        typeFailure: typeFailure,
        errorValue: errorValue,
    }
}

function login(username, password) {
    let { from } = history.location.state || { from: { pathname: '/' } }
    
    return async dispatch => {

        dispatch({ type: ActionConstants.LOGIN_REQUEST });
        try {
            const response = await axios.post(URL.LOGIN, {
                'username': username.toLowerCase(),
                'password': password,
            });
            dispatch(success(response.data));
            //localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
            history.replace(from);
        } catch (error) {
            dispatch(failure(ErrorsType.LOGIN_FAILURE, error));
        }
    }

    function success(user) { return { type: ActionConstants.LOGIN_SUCCESS, user } }
}

login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

function logout(token) {
    return async dispatch => {
        dispatch({ type: ActionConstants.LOGOUT_REQUEST });

        try {
            /*await axios({
                url: URL.LOGOUT,
                method: 'GET',
                headers: { 'Authorization': 'Token '.concat(token) }
            })*/
            localStorage.removeItem('token');
            dispatch({ type: ActionConstants.LOGOUT_SUCCESS });
            history.push('/');
        } catch (error) {
            dispatch(failure(ErrorsType.LOGOUT_FAILURE, error));
        }
    }

}

logout.propTypes = {
    token: PropTypes.string.isRequired,
}

function getInfoAccount(token) {
    return async dispatch => {
        dispatch({ type: ActionConstants.INFO_REQUIRED });
        try {
            const response = await axios({
                url: URL.GETINFOACCOUNT,
                method: 'GET',
                headers: { 'Authorization': 'Bearer '.concat(token) }
            })
            dispatch({ type: ActionConstants.INFO_SUCCESS, user: response.data })
        } catch (error) {
            dispatch(failure(ErrorsType.INFO_FAILURE, error));
        }
    }

}

function changePassword(token, old_password, new_password) {

    return async dispatch => {

        dispatch({ type: ActionConstants.CHANGE_PASSWORD_REQUEST });
        try {
            await axios({
                method: 'PUT',
                url: URL.CHANGEPASSWORD,
                headers: {
                    'Authorization': "Bearer ".concat(token),
                },
                data: {
                    'old_password': old_password,
                    'new_password': new_password,
                }
            });
            dispatch({ type: ActionConstants.CHANGE_PASSWORD_SUCCESS });
            dispatch(logout());
        } catch (error) {
            dispatch(failure(ErrorsType.CHANGE_PASSWORD_FAILURE, error))
        }
    }
}

function setMoviePreferite(token, id_movie, typeRequest) {

    return async dispatch => {

        dispatch({ type: ActionConstants.SEND_PREFERITE_REQUEST, typeRequest });
        try {
            const response = await axios({
                url: URL.MANAGEFAVORITEMOVIE,
                method: typeRequest === 'ADD TO PREFERITE' ? 'PUT' : 'DELETE',
                headers: { 'Authorization': 'Bearer '.concat(token) },
                data: { 'id': id_movie }
            });
            // Update value on Local Storage
            //let user = JSON.parse(localStorage.getItem('user'));
            //user.favorites = response.data.favorites;
            //localStorage.setItem('user', JSON.stringify(user));
            dispatch(success(response.data.favorites, typeRequest))
        } catch (error) {
            dispatch(failure(ErrorsType.SEND_PREFERITE_FAILURE, error))
        }
    }

    function success(favorite) { return { type: ActionConstants.SEND_PREFERITE_SUCCESS, favorite } }
}

setMoviePreferite.propTypes = {
    token: PropTypes.string.isRequired,
    id_movie: PropTypes.number.isRequired,
}

function voteMovie(token, id_movie, value_vote) {

    return async dispatch => {
        dispatch({ type: ActionConstants.SEND_VOTE_REQUEST, value_vote });

        try {
            const response = await axios({
                url: URL.MANAGEVOTEDMOVIE,
                method: 'PUT',
                headers: { 'Authorization': 'Bearer '.concat(token) },
                data: {
                    'id': id_movie,
                    'value_vote': value_vote
                }
            });
            dispatch(success(response.data.voted));
        } catch (error) {
            dispatch(failure(ErrorsType.SEND_VOTE_FAILURE, error))
        }
    }

    function success(voted) { return { type: ActionConstants.SEND_VOTE_SUCCESS, voted } }
}

voteMovie.propTypes = {
    token: PropTypes.string.isRequired,
    id_movie: PropTypes.number.isRequired,
    value_vote: PropTypes.number.isRequired,
}