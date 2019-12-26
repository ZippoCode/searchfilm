import { movieConstant } from '../_constants/movie.constants';

export function moviesList(state = {}, action) {
    switch (action.type) {
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