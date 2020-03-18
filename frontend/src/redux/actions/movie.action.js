
import axios from 'axios';

import { movieConstants } from '../constants/movie.constants';

import { history } from '../../helpers/history';
import * as URL from '../../helpers/matcher';

export const MovieActions = {
    recommendedMovie,
    loadMovie,
}


function request(movie_id) {
    return {
        type: movieConstants.MOVIE_REQUEST,
        movie_id
    }
}

function failure(error) {
    return {
        type: movieConstants.MOVIE_FAILURE,
        errorType: error,
    }
}

function recommendedMovie(info) {
    return async dispatch => {
        dispatch(request());
        try {
            const response = await axios({
                method: 'POST',
                url: URL.RECOMMENDMOVIE,
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(info)
            })
            dispatch(success(response.data));
            history.push('/movie/'.concat(response.data['id']))
        } catch (error) {
            dispatch(failure(error));
        }
    }

    function success(movie) { return { type: movieConstants.RECOMMENDED_SEARCH_MOVIE_SUCCESS, movie } };
}


function loadMovie(id) {

    return async dispatch => {
        dispatch(request(id))
        try {
            const response = await axios.get(URL.DETAILSMOVIE.concat(id, '/'));
            dispatch(success(response.data));
        } catch (error) {
            dispatch(failure(error))
        }
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
