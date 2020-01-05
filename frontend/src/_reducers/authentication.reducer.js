import { userConstants } from '../_constants/user.constants';


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};


export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { loggingIn: true, user: action.user };
        case userConstants.LOGIN_SUCCESS:
            return { loggedIn: true, user: action.user };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.CHANGE_PASSWORD_REQUEST:
            return { user: action.user };
        case userConstants.CHANGE_PASSWORD_SUCCESS:
            return {};
        case userConstants.CHANGE_PASSWORD_FAILURE:
            return {};
        case userConstants.ADD_PREFERITE_REQUEST:
            return { loading: true, user: action.user };
        case userConstants.ADD_PREFERITE_SUCCESS: {
            return {
                ...state,
                added: true,
                user: {
                    ...state.user,
                    favorites: action.user.favorites
                }
            }
        }
        case userConstants.ADD_PREFERITE_FAILURE:
            return { error: action.error };
        case userConstants.REMOVE_PREFERITE_REQUEST: {
            return {
                ...state,
                removed: true,
                user: {
                    ...state.user,
                    favorites: action.user.favorites
                }
            }
        }
        case userConstants.REMOVE_PREFERITE_SUCCESS:
            return { user: action.user };
        case userConstants.REMOVE_PREFERITE_FAILURE:
            return { error: action.error };
        case userConstants.ADD_VOTE_REQUEST:
            return { loading: true, user: action.user };
        case userConstants.ADD_VOTE_SUCCESS: {
            return {
                ...state,
                addVote: true,
                user: {
                    ...state.user,
                    voted: action.user.voted
                }
            }
        }
        case userConstants.ADD_VOTE_FAILURE:
            return { error: action.error };
        case userConstants.REMOVE_VOTE_REQUEST:
            return { loading: true, user: action.user };
        case userConstants.REMOVE_VOTE_SUCCESS: {
            return {
                ...state,
                removeVote: true,
                user: {
                    ...state.user,
                    voted: action.user.voted
                }
            }
        }
        case userConstants.REMOVE_VOTE_FAILURE:
            return { error: action.error };
        default:
            return state;
    }
}