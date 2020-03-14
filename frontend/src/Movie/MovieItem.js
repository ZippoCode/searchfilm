import React from 'react';
import PropTypes from 'prop-types';

import useMovieState from './MovieHook';

// Importing from Material-UI
import { withStyles } from '@material-ui/core';
import CircleProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
        '&:hover $img': { opacity: 1 },
    },
    img: {
        maxWidth: 300,
        maxHeight: 250,
        opacity: 0.9,
    },
});

function MovieItem(props) {
    const { classes, idMovie } = props;
    const movie = useMovieState(idMovie);

    const pathPoster = movie.poster_path ?
        `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://source.unsplash.com/random';

    return (
        <Paper className={classes.root}>
            {movie ?
                <Grid container
                    spacing={1}
                    component={Link}
                    href={`/movie/${movie.id}`}
                    underline='none'
                >
                    <Grid item
                        component='img'
                        alt={`poster-movie-${movie.id}`}
                        src={pathPoster}
                        className={classes.img}
                    />
                    <Grid item xs>
                        <Typography component='h6' variant='h6' color='secondary'>{movie.title}</Typography>
                        <Typography component='h4' variant='subtitle2' color='secondary'>{movie.description}</Typography>
                    </Grid>
                </Grid>
                :
                <CircleProgress />
            }
        </Paper>
    )
}

MovieItem.propTypes = {
    idMovie: PropTypes.number.isRequired,
}

export default withStyles(styles)(MovieItem);