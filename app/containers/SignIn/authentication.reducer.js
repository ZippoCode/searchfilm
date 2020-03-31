import { AuthenticationConstants } from './constants';

const initialState = {
    isLoaded: false,
    token: null,
    error: false,
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case AuthenticationConstants.LOGIN_REQUEST:
            return Object.assign({}, state, {
                isLoaded: false,
                error: false,
            })
        case AuthenticationConstants.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoaded: true,
                token: action.token,
                error: false,
            })
        case AuthenticationConstants.LOGIN_FAILURE:
            return Object.assign({}, state, {
                isLoaded: false,
                token: null,
                error: true,
            })
        case AuthenticationConstants.LOGOUT:
            return Object.assign({}, state, {
                isLoaded: false,
                token: null,
                error: false,
            })
        default:
            return state
    }


}