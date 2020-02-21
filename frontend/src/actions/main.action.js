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

export const movieAction = {
    getListMovies,
    viewTopPopularWithGenre,
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
    const PATH_POPULAR = 'http://127.0.0.1:8000/movie/api/topPopular';
    const PATH_RANKING = 'http://127.0.0.1:8000/movie/api/topRanking';

    return dispatch => {

        dispatch(request());
        const path = ((type === typeList.POPULAR) ? PATH_POPULAR : PATH_RANKING);

        return fetch(path)
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

        return fetch('http://127.0.0.1:8000/movie/api/genres')
            .then(handleErrors)
            .then(genres => dispatch(success(genres)))
            .catch(error => dispatch(failure(error)))
    }

    function request() { return { type: GET_GENRES_REQUEST } }
    function success(genres) { return { type: GET_GENRES_SUCCESS, genres } }
}

function viewTopPopularWithGenre(genre) {
    const PATH_POPULAR_GENRE = 'http://127.0.0.1:8000/movie/api/topPopular/';

    return function (dispatch) {
        dispatch(request());

        return fetch(PATH_POPULAR_GENRE.concat(genre))
            .then(handleErrors)
            .then(movies => dispatch(success(movies)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: VIEW_TOP_POPULAR_GENRE_MOVIE_REQUEST } }
    function success(movies) { return { type: VIEW_TOP_POPULAR_GENRE_MOVIE_SUCCESS, movies } }
}
