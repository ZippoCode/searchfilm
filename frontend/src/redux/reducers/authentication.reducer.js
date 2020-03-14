import { ActionConstants } from '../constants/authentication.constants';

/*let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    logged: true,
    id: user.id,
    token: user.token,
    first_name: user.first_name,
    last_name: user.last_name,
    date_joined: user.date_joined,
    favorite: user.favorites,
    voted: user.voted,
} : {};*/

const token = localStorage.getItem('token');
const initialState = token ? { logged: true, token: token } : {}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case ActionConstants.LOGIN_REQUEST:
            return Object.assign({}, state, {
                logged: false,
            })
        case ActionConstants.LOGIN_SUCCESS:
            return {
                logged: true,
                token: action.user.token,
            };
        case ActionConstants.INFO_REQUIRED:
            return Object.assign({}, state, {
                loaded: false,
            });
        case ActionConstants.INFO_SUCCESS:
            return Object.assign({}, state, {
                logged: true,
                id: action.user.id,
                first_name: action.user.first_name,
                last_name: action.user.last_name,
                date_joined: action.user.date_joined,
                favorite: action.user.favorites,
                voted: action.user.voted,
            });
        case ActionConstants.LOGOUT_REQUEST:
            return Object.assign({}, state, {
                logout: false,
            });
        case ActionConstants.LOGOUT_SUCCESS:
            return { logout: true };
        case ActionConstants.CHANGE_PASSWORD_REQUEST:
            return { user: action.token };
        case ActionConstants.CHANGE_PASSWORD_SUCCESS:
            return {};
        case ActionConstants.SEND_PREFERITE_REQUEST:
            return Object.assign({}, state, {
                sendRequestPreferite: false,
                request: action.typeRequest
            });
        case ActionConstants.SEND_PREFERITE_SUCCESS:
            return Object.assign({}, state, {
                sendRequestVote: true,
                favorite: action.favorite
            });
        case ActionConstants.SEND_VOTE_REQUEST:
            return Object.assign({}, state, {
                sendVoteRequest: false,
                vote: action.vote,
            });
        case ActionConstants.SEND_VOTE_SUCCESS:
            return Object.assign({}, state, {
                sendRequestVote: true,
                voted: action.voted
            })
        case ActionConstants.ERROR_REQUEST:
            return Object.assign({}, state, {
                error: true,
                typeFailure: action.typeFailure,
                errorValue: action.errorValue,
            })
        default:
            return state;
    }
}