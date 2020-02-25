import { UserActions } from '../constants/user.constants';


const initialState = {
    favorite: [],
    voted: [],
    userLoaded: false,
}

export function user(state = initialState, action) {
    switch (action.type) {
        case UserActions.USER_INFO_REQUEST:
            return Object.assign({}, state, {});
        case UserActions.USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                userLoaded: !state.userLoaded,
                first_name: action.first_name,
                last_name: action.last_name,
                date_joined: action.date_joined,
                favorite: action.favorite,
                voted: action.voted,
            });
        case UserActions.USER_INFO_FAILURE:
            return Object.assign({}, state, {
                error: true,
                errorValue: action.error,
            });
        case UserActions.SEND_PREFERITE_REQUEST:
            return Object.assign({}, state, {
                sendRequestVote: false,
                request: action.typeRequest
            });
        case UserActions.SEND_PREFERITE_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                sendRequestVote: true,
                favorite: action.favorite
            })
        case UserActions.SEND_PREFERITE_FAILURE:
            return Object.assign({}, state, {
                error: true,
                errorValue: action.error,
            });
        case UserActions.SEND_VOTE_REQUEST:
            return Object.assign({}, state, {
                sendVoteRequest: false,
                vote: action.vote,
            });
        case UserActions.SEND_VOTE_SUCCESS:
            return Object.assign({}, state, {
                sendVoteRequest: true,
                ...state,
                sendRequestVote: true,
                voted: action.voted
            })
        default:
            return state;
    }
}