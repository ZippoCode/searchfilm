import { FavoriteConstants, PATH_FAVORITE } from './constants';

export function fetchAsyncFavorites(token) {
    return dispatch => {
        dispatch({ type: FavoriteConstants.FAVORITE_LIST_REQUEST });
        fetch(PATH_FAVORITE, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(token)
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({ type: FavoriteConstants.FAVORITE_LIST_SUCCESS, favorites: responseJson.favorites });
            })
            .catch(error => dispatch({ type: FavoriteConstants.FAVORITE_LIST_FAILURE }))
    }
}

export function manageFavorite(token, type, id) {

    return dispatch => {
        dispatch({ type: FavoriteConstants.FAVORITE_REQUEST, id: id, request: type });
        fetch(PATH_FAVORITE, {
            method: type,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(token)
            },
            body: JSON.stringify({ id: id })
        })
            .then(
                response => response.json(),
                error => console.log(error),
            )
            .then(json => dispatch({
                type: FavoriteConstants.FAVORITE_SUCCESS,
                id: id,
                request: type,
                movies: json.favorites
            }))
            .catch(error => dispatch({ type: FavoriteConstants.FAVORITE_FAILURE }))
    }
}