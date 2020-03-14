import React from 'react';
import { useLocation } from 'react-router-dom';

import ListPeople from './ListPeople';

// Importing style from Material-UI
import { withStyles } from '@material-ui/core';
import BreadCrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {}
})

function DetailMovie(props) {
    const { movie, classes } = props;
    const location = useLocation();
    const actors = movie ? movie.actors.slice(0, 6) : []

    return (
        <Grid container direction='column' spacing={2}>
            <Grid item>
                <BreadCrumbs aria-label='breadcrumb' color='secondary'>
                    {movie.genres.map(genre => (
                        <Link href={`/movies/genre/${genre.name}`} key={genre.id} color='inherit'>
                            {genre.name}
                        </Link>
                    ))}
                </BreadCrumbs>
            </Grid>
            <Grid item>
                <Typography variant='h5' align='right'>{new Date(movie.release_date).getFullYear()}</Typography>
                <Typography variant='h3' gutterBottom>{movie.title}</Typography>
                <Typography variant='body1' paragraph>{movie.description}</Typography>
                <Typography variant='body2' gutterBottom>Titolo originale: {movie.original_title}</Typography>
            </Grid>
            <Divider />
            <Grid item>
                <Typography variant='h5'>
                    <Grid container justify='space-evenly' className={classes.vote}>
                        <Grid item>
                            Numero voti: {movie.vote_counter}
                        </Grid>
                        <Grid item>
                            Voto medio: {movie.vote_average.toFixed(1)}
                        </Grid>
                    </Grid>
                </Typography>
            </Grid>
            <Divider />
            <Grid item>
                <Typography variant='h5' component='h5'>Registi</Typography>
                <ListPeople list={movie.directors} />
            </Grid>
            <Grid item>
                <Typography variant='h5'>Cast</Typography>
                <ListPeople list={actors} />
                <Link
                    href={`${location.pathname}/cast`}
                    state={movie.actors}
                    color='inherit'
                >
                    <p>Visualizzali tutti</p>
                </Link>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(DetailMovie);