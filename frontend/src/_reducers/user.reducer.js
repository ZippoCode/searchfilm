import { userConstants } from '../_constants/user.constants';
/*
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function userMovie(state = initialState, action) {
    switch (action.type) {
        case userConstants.ADD_PREFERITE_REQUEST:
            return { loading: true, user: action.user };
        case userConstants.ADD_PREFERITE_SUCCESS: {
            return {
                ...state,
                addedFavorite: true,
                user: {
                    ...state.user,
                    favorites: action.user.favorites
                }
            }
        };
        case userConstants.ADD_PREFERITE_FAILURE:
            return { error: action.error };
        case userConstants.REMOVE_PREFERITE_REQUEST: {
            return {
                ...state,
                removeFavorite: true,
                user: {
                    ...state.user,
                    voted: action.user.voted
                }
            }
        };
        case userConstants.REMOVE_PREFERITE_SUCCESS:
            return { user: action.user };
        case userConstants.REMOVE_PREFERITE_FAILURE:
            return { error: action.error };
        
        // ADD VOTE
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
        };
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
        };
        case userConstants.REMOVE_VOTE_FAILURE:
            return { error: action.error };
        default:
            return state;
    }
}
*/