
import { movieConstants } from '../constants/movie.constants';
import { history } from '../helpers/history';


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
        return fetch(`http://127.0.0.1:8000/movie/api/get/movie`)
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
    const PATH_DETAIL_MOVIE = 'http://127.0.0.1:8000/movie/api/get/';

    return function (dispatch) {
        dispatch(request(id))

        return fetch(PATH_DETAIL_MOVIE.concat(id))
            .then(response => response.json())
            .then(
                data => { dispatch(success(data)); },
                error => { dispatch(failure(error)); }
            )
    }

    function success(movie) { return { type: movieConstants.VIEW_MOVIE_SUCCESS, movie } }
}

export function searchMovie(title_movie) {

    const PATH_SEARCH_MOVIE = 'http://127.0.0.1:8000/movie/api/search/';

    return function (dispatch) {

        dispatch(request(title_movie));

        return fetch(PATH_SEARCH_MOVIE.concat(title_movie))
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
/*
export function updateVote(movie) {
    return { type: movieConstants.UPDATE_VOTE_MOVIE, movie };
}*/