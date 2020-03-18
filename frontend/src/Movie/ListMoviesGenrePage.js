import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

// Importing actions
import { getListMoviesGenre } from '../redux/actions/main.action';

// Importing custom components
import MovieItem from './MovieItem';

// Importing from Material-UI
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
    root: {
        padding: theme.spacing(4, 8),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4, 2),
        }
    }
})

function ListMovieGenrePage(props) {
    const { classes } = props;
    let { genre } = useParams();

    const dispatch = useDispatch();
    const fullMovie = useSelector(state => state.main.movieGenre) || [];
    const movies = fullMovie.slice(0, 20);

    useEffect(() => {
        dispatch(getListMoviesGenre(genre));
    }, [genre, dispatch]);

    return (
        <Container className={classes.root} component='section'>
            <Typography
                component='h2'
                variant='h3'
                align='left'
                gutterBottom
            >
                I film più popolari {genre}
            </Typography>
            <Grid container item xs={12} spacing={1}>
                {movies.map(movie => (
                    <Grid item key={movie.id} xs={12} md={6}>
                        <MovieItem idMovie={movie.id} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default withStyles(styles)(ListMovieGenrePage);