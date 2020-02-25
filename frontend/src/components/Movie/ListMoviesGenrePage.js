import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

// Importing actions
import { getListMoviesGenre } from '../../redux/actions/main.action';

// Importing custom components
import { ListMovies } from './ListMovies';

function ListMovieGenrePage() {
    let { genre } = useParams();

    const dispatch = useDispatch();
    const fullMovie = useSelector(state => state.main.movieGenre) || [];
    const movies = fullMovie.slice(1, 21);

    useEffect(() => {
        dispatch(getListMoviesGenre(genre));
    }, [genre, dispatch]);

    return (
        <div>
            <p>Lista film per genere</p>
            <ListMovies movies={movies} />
        </div>
    )
}

export default ListMovieGenrePage;