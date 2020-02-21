import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Import Actions
import { movieAction } from '../../actions/main.action';

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
            fetch(`http://127.0.0.1:8000/movie/api/get/${idMovie}`)
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

const ListMovies = ({ title, movies }) => (
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

export function ViewListMovies() {
    let { type } = useParams();
    const dispatch = useDispatch();

    let popular = useSelector(state => state.main.popularMovies);
    let rated = useSelector(state => state.main.topRankedMovies);

    useEffect(() => {
        dispatch(movieAction.getListMovies(type));
    }, [type, dispatch]);

    return (
        <div>
            {type === 'popular' ?
                <ListMovies movies={popular} title='I film più popolari' />
                :
                <ListMovies movies={rated} title='I film più votati' />
            }
        </div>
    )
}