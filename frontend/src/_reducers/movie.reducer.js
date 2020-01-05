import { movieConstant } from '../_constants/movie.constants';

let movies = JSON.parse(localStorage.getItem('movies'))
const initialState = movies ? { movies } : {};

export function movie(state = initialState, action) {
    switch (action.type) {
        case movieConstant.SEARCH_MOVIE_REQUEST:
            return { loading: true };
        case movieConstant.SEARCH_MOVIE_SUCCESS:
            return { movie: action.movie };
        case movieConstant.SEARCH_MOVIE_FAILURE:
            return { error: action.error };
        // TOP POPULAR MOVIE
        case movieConstant.VIEW_TOP_POPULAR_MOVIE_REQUEST:
            return { loading: true };
        case movieConstant.VIEW_TOP_POPULAR_MOVIE_SUCCESS:
            return { movies: action.movies, typeList: 'POPULAR' };
        case movieConstant.VIEW_TOP_POPULAR_MOVIE_FAILURE:
            return { error: action.error };
        case movieConstant.VIEW_TOP_RANKING_MOVIE_REQUEST:
            return { loading: true };
        case movieConstant.VIEW_TOP_RANKING_MOVIE_SUCCESS:
            return { movies: action.movies, typeList: 'RANKING' };
        case movieConstant.VIEW_TOP_RANKING_MOVIE_FAILURE:
            return { error: action.error };
        case movieConstant.VIEW_TOP_POPULAR_GENRE_MOVIE_REQUEST:
            return { loading: true };
        case movieConstant.VIEW_TOP_POPULAR_GENRE_MOVIE_SUCCESS:
            return { movies: action.movies };
        case movieConstant.VIEW_TOP_POPULAR_GENRE_MOVIE_FAILURE:
            return { error: action.error };
        default:
            return state;
    }
} 