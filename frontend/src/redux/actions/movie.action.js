
import { movieConstants } from '../constants/movie.constants';

import { history } from '../../helpers/history';
import * as URL from '../../helpers/matcher';

function request() {
    return {
        type: movieConstants.MOVIE_REQUEST
    }
}

function failure(error) {
    return {
        type: movieConstants.MOVIE_FAILURE,
        errorType: error,
    }
}

export function recommendedMovie() {
    return dispatch => {
        dispatch(request());
        return fetch(URL.RECOMMENDMOVIE)
            .then(response => response.json())
            .then(json => {
                dispatch(success(json));
                history.push('/movie/'.concat(json['id']));
            })
            .catch(error => dispatch(failure(error)))
    }

    function success(movie) { return { type: movieConstants.RECOMMENDED_SEARCH_MOVIE_SUCCESS, movie } };
}


export function loadMovie(id) {

    return function (dispatch) {
        dispatch(request(id))

        return fetch(URL.DETAILSMOVIE.concat(id))
            .then(response => response.json())
            .then(
                data => { dispatch(success(data)); },
                error => { dispatch(failure(error)); }
            )
    }

    function success(movie) { return { type: movieConstants.VIEW_MOVIE_SUCCESS, movie } }
}

export function searchMovie(title_movie) {


    return function (dispatch) {

        dispatch(request(title_movie));

        return fetch(URL.SEARCHMOVIEBYID.concat(title_movie))
            .then(response => response.json())
            .then(
                movie => {
                    dispatch(success(movie));
                },
                error => dispatch(failure(error))
            )
    }

    function success(movie) { return { type: movieConstants.SEARCH_MOVIE_SUCCESS, movie } }
}
