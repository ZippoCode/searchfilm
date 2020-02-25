import { movieConstants } from '../constants/movie.constants';

const initialState = {
    movie: '',
    loaded: false,
}

export function movie(state = initialState, action) {
    switch (action.type) {
        case movieConstants.MOVIE_REQUEST:
            return Object.assign({}, state, {
                loaded: false,
            });
        case movieConstants.VIEW_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                loaded: !state.loaded,
                movie: action.movie,
            });
        case movieConstants.RECOMMENDED_SEARCH_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                loaded: !state.loaded,
                movie: action.movie,
            });
        case movieConstants.MOVIE_FAILURE:
            return Object.assign({}, state, {
                error: true,
            });
        default:
            return state;
    }
}