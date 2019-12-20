import { userConstants } from '../_constants/user.constants';
import { userService } from '../_service/user.service'
// ALERT ACTIONS


import { history } from '../_helpers/history';

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
                    alert(error); // MESSAGGIO DI ERRORE
                }
            );

    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT }
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
                    alert('Error: ' + error.status)
                }
            )
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


export const userActions = {
    login,
    logout,
    register
}