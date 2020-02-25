import React, { useEffect, useState } from 'react';

// Importing constants
import * as URL from '../../helpers/matcher';

// Importing from Material-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Importing from Styled-Components
import styled from 'styled-components';

const ImagePoster = styled.img`
    height: 300px;
    width: 250;
`;

function MovieItem(props) {
    let { idMovie } = props;
    const [movie, setMovie] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            fetch(URL.DETAILSMOVIE.concat(idMovie))
                .then(response => response.json())
                .then(movie => setMovie(movie))
        }
        fetchData();
    }, [idMovie]);

    return (
        <Grid container spacing={2} component={Paper}>
            <Grid item>
                <ImagePoster src={`https://image.tmdb.org/t/p/w500/${movie.tmdb_file_path_poster}`} />
            </Grid>
            <Grid item xs>
                <h2>{movie.title}</h2>
                <h4>{movie.description}</h4>
            </Grid>
        </Grid>
    )
}

export const ListMovies = ({ title, movies }) => (
    <Grid container>
        <h2>{title}</h2>
        <Grid container item xs={12} spacing={3}>
            {movies.map((movie, index) => (
                <Grid item xs={6} key={index}>
                    <MovieItem idMovie={movie.id} />
                </Grid>
            ))}
        </Grid>
    </Grid>
);