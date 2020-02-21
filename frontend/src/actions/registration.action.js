import { userService } from '../service/user.service';
import * as ErrorAction from './error.action';
import { history } from '../helpers/history';

export const REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export function register(user) {

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

    function request(user) { return { type: REGISTER_REQUEST, user } }
    function success(user) { return { type: REGISTER_SUCCESS, user } }
    function failure(error) { return { type: REGISTER_FAILURE, error } }
}