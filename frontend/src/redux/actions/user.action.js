import {
    UserActions,
    ADD_FAVORITE,
} from '../constants/user.constants';

import * as URL from '../../helpers/matcher';

function successInfoAccount(user) {
    return {
        type: UserActions.USER_INFO_SUCCESS,
        first_name: user.first_name,
        last_name: user.last_name,
        date_joined: user.date_joined,
        favorite: user.favorites,
        voted: user.voted,
    }
}

export function requestInfoAccount(token) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(token));
    var requestOptions = {
        method: 'GET',
        headers: headers,
    };

    return dispatch => {
        dispatch(request());
        return fetch(URL.GETINFOACCOUNT, requestOptions)
            .then(response => response.json())
            .then(
                user => {
                    dispatch(successInfoAccount(user))
                });
    }

    function request() { return { type: UserActions.USER_INFO_REQUEST } };
}


export function addRemoveMoviePreferite(token, id_movie, typeRequest) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(token));
    var formdata = new FormData();
    formdata.append("id", id_movie);

    var requestOptions = {
        method: (typeRequest === ADD_FAVORITE) ? 'PUT' : 'DELETE',
        headers: headers,
        body: formdata,
    };

    return dispatch => {

        dispatch(request(typeRequest));
        return fetch(URL.MANAGEFAVORITEMOVIE, requestOptions)
            .then(response => response.json())
            .then(response => { dispatch(success(response.favorites, typeRequest)) });


        function request(typeRequest) { return { type: UserActions.SEND_PREFERITE_REQUEST, typeRequest } }
        function success(favorite) { return { type: UserActions.SEND_PREFERITE_SUCCESS, favorite } }
        //function failure() { return { type: UserActions.ADD_PREFERITE_FAILURE } }
    }
}

export function voteMovie(token, id_movie, value_vote) {
    const headers = new Headers();
    headers.append("Authorization", "Token ".concat(token));
    const formdata = new FormData();
    formdata.append("id", id_movie);
    formdata.append("value_vote", value_vote);

    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: formdata,
    };

    return dispatch => {
        dispatch(request(value_vote));

        fetch(URL.MANAGEVOTEDMOVIE, requestOptions)
            .then(response => response.json())
            .then(response => dispatch(success(response.voted)))

        function request(vote) { return { type: UserActions.SEND_VOTE_REQUEST, vote } }
        function success(voted) { return { type: UserActions.SEND_VOTE_SUCCESS, voted } }
    }
}