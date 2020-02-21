import {
    UserActions,
    ADD_FAVORITE,
} from '../constants/user.constants';

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
        return fetch('http://127.0.0.1:8000/account/api/auth/user', requestOptions)
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
        return fetch('http://127.0.0.1:8000/account/api/favorite', requestOptions)
            .then(response => response.json())
            .then(response => { dispatch(success(response.favorites, typeRequest)) });


        function request(typeRequest) { return { type: UserActions.SEND_PREFERITE_REQUEST, typeRequest } }
        function success(favorite) { return { type: UserActions.SEND_PREFERITE_SUCCESS, favorite } }
        //function failure() { return { type: UserActions.ADD_PREFERITE_FAILURE } }
    }
}

/*
function add_vote(user, id_movie, value_vote) {
    return dispatch => {
        dispatch(request(user));
        userService.add_vote(user, id_movie, value_vote)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('Error: '.concat(error.status));
                });

        function request() { return { type: userConstants.ADD_VOTE_REQUEST } }
        function success(user) { return { type: userConstants.ADD_VOTE_SUCCESS, user } }
        function failure(error) { return { type: userConstants.ADD_VOTE_FAILURE, error } }
    }
}

function remove_vote(user, id_movie) {
    return dispatch => {

        dispatch(request(user));

        userService.remove_vote(user, id_movie)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    alert('Error: '.concat(error.status));
                });

        function request(user) { return { type: userConstants.REMOVE_VOTE_REQUEST, user } }
        function success(user) { return { type: userConstants.REMOVE_VOTE_SUCCESS, user } }
        function failure(error) { return { type: userConstants.REMOVE_VOTE_FAILURE, error } }
    }
}*/