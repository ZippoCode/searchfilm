import { movieConstant } from '../_constants/movie.constants';
import { movieService } from '../_service/movie.service';

import { history } from '../_helpers/history';

export const movieAction = {
    viewTopPopular,
    viewTopPopularWithGenre,
    viewTopRanked
}

function viewTopPopular() {
    return dispatch => {
        dispatch(request());

        movieService.getTopPopular()
            .then(
                movies => {
                    dispatch(success(movies))
                    history.push('/movies/top/popular');
                },
                error => dispatch(failure(error))
            )
    };

    function request() { return { type: movieConstant.VIEW_TOP_POPULAR_MOVIE_REQUEST } }
    function success(movies) { return { type: movieConstant.VIEW_TOP_POPULAR_MOVIE_SUCCESS, movies } }
    function failure(error) { return { type: movieConstant.VIEW_TOP_POPULAR_MOVIE_FAILURE, error } }
}

function viewTopPopularWithGenre(genre) {
    return dispatch => {
        dispatch(request());

        movieService.getTopPopularWithGenre(genre)
            .then(
                movies => {
                    dispatch(success(movies))
                    history.push('/movies/top/popular');
                },
                error => dispatch(failure(error))
            )
    };

    function request() { return { type: movieConstant.VIEW_TOP_POPULAR_GENRE_MOVIE_REQUEST } }
    function success(movies) { return { type: movieConstant.VIEW_TOP_POPULAR_GENRE_MOVIE_SUCCESS, movies } }
    function failure(error) { return { type: movieConstant.VIEW_TOP_POPULAR_GENRE_MOVIE_FAILURE, error } }
}



function viewTopRanked() {
    return dispatch => {
        dispatch(request());

        movieService.getTopRanked()
            .then(
                movies => {
                    dispatch(success(movies))
                    history.push('/movies/top/ranking')
                },

                error => dispatch(failure(error))
            )
    };

    function request() { return { type: movieConstant.VIEW_TOP_RANKING_MOVIE_REQUEST } }
    function success(movies) { return { type: movieConstant.VIEW_TOP_RANKING_MOVIE_SUCCESS, movies } }
    function failure(error) { return { type: movieConstant.VIEW_TOP_RANKING_MOVIE_FAILURE, error } }
}

