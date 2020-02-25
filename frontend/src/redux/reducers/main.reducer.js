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


const initialState = {
    popularMovies: [],
    topRankedMovies: [],
    movieGenre: [],
    genres: []
}

export function main(state = initialState, action) {
    switch (action.type) {
        case GET_LIST_REQUEST:
            return Object.assign({}, state, {
                loadedPopular: false,
            });
        case GET_POPULAR_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                loadedPopular: !state.loadedPopular,
                popularMovies: action.movies
            });
        case GET_TOP_RANKED_SUCCESS:
            return Object.assign({}, state, {
                loadedPopular: !state.loadedPopular,
                topRankedMovies: action.movies
            });
        case GET_LIST_FAILURE:
            return Object.assign({}, state, {
                error: true,
                error_value: action.errorValue
            });
        case GET_GENRES_REQUEST:
            return Object.assign({}, state, {
                loadedGenres: false,
            });
        case GET_GENRES_SUCCESS:
            return Object.assign({}, state, {
                loadedGenres: !state.loadedGenres,
                genres: action.genres,
            });
        case VIEW_TOP_POPULAR_GENRE_MOVIE_REQUEST:
            return Object.assign({}, state, {
                loadingMovieGenre: false,
            });
        case VIEW_TOP_POPULAR_GENRE_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                loadingMovieGenre: !state.loadingMovieGenre,
                movieGenre: action.movies
            });
        default:
            return state;
    }
} 