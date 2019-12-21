import { userConstants } from '../_constants/user.constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function userAddRemoveMovie(state = initialState, action) {
    switch (action.type) {
        case userConstants.ADD_PREFERITE_REQUEST:
            return { loading: true, user: action.user };
        case userConstants.ADD_PREFERITE_SUCCESS:
            return { user: action.user };
        case userConstants.ADD_PREFERITE_FAILURE:
            return { error: action.error };
        case userConstants.REMOVE_PREFERITE_REQUEST:
            return { loading: true, user: action.user };
        case userConstants.REMOVE_PREFERITE_SUCCESS:
            return { user: action.user };
        case userConstants.REMOVE_PREFERITE_FAILURE:
            return { error: action.error };
        default:
            return state;
    }
}