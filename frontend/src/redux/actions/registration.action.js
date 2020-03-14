import axios from 'axios';

// Importing history for push
import { history } from '../../helpers/history';

import * as URL from '../../helpers/matcher';

export const REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export function register(user) {

    return async dispatch => {
        dispatch(request(user));
        try {
            const response = await axios({
                method: 'POST',
                url: URL.REGISTER,
                data: {
                    'username': user.username,
                    'email': user.email,
                    'password': user.password,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
            })
            dispatch(success(response.data));
            history.push('/');
        } catch (error) { return dispatch(failure(error.toString())); }
    }

    function request(user) { return { type: REGISTER_REQUEST, user } }
    function success(user) { return { type: REGISTER_SUCCESS, user } }
    function failure(error) { return { type: REGISTER_FAILURE, error } }
}