import { VotedConstants } from './constants';

const initialState = {
    isFetching: false,
    error: false,
    idMovie: -1,
    valueVote: -1,
    typeRequest: '',
    voted: [],
}

export function voted(state = initialState, action) {
    switch (action.type) {
        case VotedConstants.VOTED_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
            });
        case VotedConstants.VOTED_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                voted: action.favorites,
                error: false,
            })
        case VotedConstants.VOTED_LIST_FAILURE:
            return Object.assign({}, state, {
                error: true,
            })
        case VotedConstants.VOTED_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                idMovie: action.id,
                valueVote: action.valueVote,
                typeRequest: action.request
            });
        case VotedConstants.VOTED_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                idMovie: action.id,
                valueVote: action.valueVote,
                typeRequest: action.request,
                voted: action.movies,
            })
        case VotedConstants.VOTED_FAILURE:
            return Object.assign({}, state, {
                error: true,
            })
        default:
            return state
    }
}