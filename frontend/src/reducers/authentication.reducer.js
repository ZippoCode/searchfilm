import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
} from '../constants/authentication.constants';

let token = JSON.parse(localStorage.getItem('token'));
const initialState = token ? { logged: true, token } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                logged: false,
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                logged: !state.logged,
                token: action.token,
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                error: true,
            });
        case LOGOUT_REQUEST:
            return {};
        case LOGOUT_SUCCESS:
            return {};
        case LOGOUT_FAILURE:
            return {};
        case CHANGE_PASSWORD_REQUEST:
            return { user: action.token };
        case CHANGE_PASSWORD_SUCCESS:
            return {};
        case CHANGE_PASSWORD_FAILURE:
            return {};
        default:
            return state;
    }
}