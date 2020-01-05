import React from 'react';

import { useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';


export function StatisticsTab() {
    const { user } = useSelector(state => state.authentication);

    const { favorites, voted } = user;
    let emptyFavorites = (favorites === undefined || favorites.length === 0);
    let emptyVoted = (voted === undefined || voted.length === 0);

    return (
        <div>
            <h3>Numero di film visti</h3>
            <h4>{favorites.length}</h4>
            <h3>Numero di film votati</h3>
            <h4>{voted.length}</h4>
            <h3>I tuoi film preferiti</h3>
            {
                (() => {
                    if (!emptyFavorites) {
                        return <ul>
                            {favorites.map((movie, index) => (
                                <li key={index}>
                                    <RouterLink to={{
                                        pathname: `/movie/${movie.movie}`
                                    }}>
                                        {movie.title}
                                    </RouterLink>
                                </li>
                            ))}
                        </ul>
                    }
                })()
            }
            <h3>I tuoi film votati</h3>
            {
                (() => {
                    if (!emptyVoted) {
                        return <ul>
                            {voted.map((movie, index) => (
                                <li key={index}>
                                    <RouterLink to={{
                                        pathname: `/movie/${movie.movie}`
                                    }}>
                                        {movie.title}
                                    </RouterLink>
                                </li>
                            ))}
                        </ul>
                    }
                })()
            }
        </div>
    )
}
