import { FavoriteConstants } from './constants';

const initialState = {
    isFetching: false,
    error: false,
    idMovie: -1,
    typeRequest: '',
    favorites: [],
}

export function favorites(state = initialState, action) {
    switch (action.type) {
        case FavoriteConstants.FAVORITE_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
            });
        case FavoriteConstants.FAVORITE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                favorites: action.favorites,
                error: false,
            })
        case FavoriteConstants.FAVORITE_LIST_FAILURE:
            return Object.assign({}, state, {
                error: true,
            })
        case FavoriteConstants.FAVORITE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                idMovie: action.id,
                typeRequest: action.request
            });
        case FavoriteConstants.FAVORITE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                idMovie: action.id,
                typeRequest: action.request,
                favorites: action.movies,
            })
        case FavoriteConstants.FAVORITE_FAILURE:
            return Object.assign({}, state, {
                error: true,
            })
        default:
            return state
    }
}