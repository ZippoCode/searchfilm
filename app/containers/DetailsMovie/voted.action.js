import { VotedConstants, PATH_VOTED } from './constants';

export function fetchAsyncVoted(token) {
    return dispatch => {
        dispatch({ type: VotedConstants.VOTED_LIST_REQUEST });
        fetch(PATH_VOTED, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(token)
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({ type: VotedConstants.VOTED_LIST_SUCCESS, favorites: responseJson.voted });
            })
            .catch(error => dispatch({ type: VotedConstants.VOTED_LIST_FAILURE }))
    }
}

export function manageVoted(token, type, id, value) {

    return dispatch => {
        dispatch({ type: VotedConstants.VOTED_REQUEST, id: id, request: type, valueVote: value });
        fetch(PATH_VOTED, {
            method: type,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(token)
            },
            body: JSON.stringify({ id: id, value_vote: value })
        })
            .then(
                response => response.json(),
                error => console.log(error),
            )
            .then(json => dispatch({
                type: VotedConstants.VOTED_SUCCESS,
                id: id,
                valueVote: value,
                request: type,
                movies: json.voted
            }))
            .catch(error => dispatch({ type: VotedConstants.VOTED_FAILURE }))
    }
}