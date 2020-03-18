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
import axios from 'axios';

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

function getListMovies(type, numPage) {

    const PATHURL = type === typeList.POPULAR ? URL.TOPPOPULAR : URL.TOPRANKING;
    return async dispatch => {

        dispatch({ type: GET_LIST_REQUEST });
        try {
            const response = await axios({
                method: 'GET',
                url: PATHURL.concat(`?page=${numPage}`)
            });
            if (type === typeList.POPULAR)
                dispatch({
                    type: GET_POPULAR_MOVIE_SUCCESS,
                    movies: response.data.results,
                    numPage: response.data.count,
                })
            else
                dispatch({
                    type: GET_TOP_RANKED_SUCCESS,
                    movies: response.data.results,
                    numPage: response.data.count,
                })
        } catch (error) { (failure(error)) }
    }
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
