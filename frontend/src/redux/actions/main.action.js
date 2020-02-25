import {
    GET_LIST_REQUEST,
    GET_POPULAR_MOVIE_SUCCESS,
    GET_TOP_RANKED_SUCCESS,
    GET_LIST_FAILURE,

    GET_GENRES_REQUEST,
    GET_GENRES_SUCCESS,


    VIEW_TOP_POPULAR_GENRE_MOVIE_SUCCESS,
    VIEW_TOP_POPULAR_GENRE_MOVIE_REQUEST
} from '../constants/main.constants';

import * as URL from '../../helpers/matcher';


export const movieAction = {
    getListMovies,
}

export const typeList = {
    POPULAR: 'popular',
    TOP: 'rated',
}

function handleErrors(response) {
    if (!response.ok)
        throw Error(response.statusText)
    return response.json();
}


function failure(error) {
    return {
        type: GET_LIST_FAILURE,
        errorValue: error.toString(),
    }
}

function getListMovies(type) {

    return dispatch => {

        dispatch(request());

        return fetch((type === typeList.POPULAR) ? URL.TOPPOPULAR : URL.TOPRANKING)
            .then(handleErrors)
            .then(movies => {
                if (type === typeList.POPULAR)
                    dispatch(successFavorite(movies))
                else
                    dispatch(successTopRanked(movies))
            })
            .catch(error => dispatch(failure(error)))
    }

    function request() { return { type: GET_LIST_REQUEST } }
    function successFavorite(movies) { return { type: GET_POPULAR_MOVIE_SUCCESS, movies } }
    function successTopRanked(movies) { return { type: GET_TOP_RANKED_SUCCESS, movies } }

}

export function getGenres() {

    return dispatch => {
        dispatch(request());

        return fetch(URL.GENRES)
            .then(handleErrors)
            .then(genres => dispatch(success(genres)))
            .catch(error => dispatch(failure(error)))
    }

    function request() { return { type: GET_GENRES_REQUEST } }
    function success(genres) { return { type: GET_GENRES_SUCCESS, genres } }
}

export function getListMoviesGenre(genre) {

    return dispatch => {
        dispatch(request());

        return fetch(URL.SEARCHMOVIEWITHGENRE.concat(genre))
            .then(handleErrors)
            .then(movies => dispatch(success(movies)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: VIEW_TOP_POPULAR_GENRE_MOVIE_REQUEST } }
    function success(movies) { return { type: VIEW_TOP_POPULAR_GENRE_MOVIE_SUCCESS, movies } }
}