import React from 'react';
import { Link } from 'react-router-dom';


export function StatisticsTab(props) {
    const { favorites, voted } = props;

    return (
        <div>
            <h3>Numero di film visti</h3>
            <h4>{favorites.length}</h4>
            <h3>Numero di film votati</h3>
            <h4>{voted.length}</h4>
            <h3>I tuoi film preferiti</h3>
            <MovieList movies={favorites} />
            <h3>I tuoi film votati</h3>
            <MovieList movies={voted} />
        </div>
    )
}

function MovieList(props) {
    const moviesList = props.movies.map((movie, index) => (
        <Link to={`/movie/${movie.movie}`} key={index}>
            <li>{movie.title}</li>
        </Link>
    ))

    return <ul>{moviesList}</ul>
}
