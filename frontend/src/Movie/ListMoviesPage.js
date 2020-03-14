import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Import Actions
import { movieAction } from '../redux/actions/main.action';

// Importing custom components
import MovieItem from './MovieItem';

// Importing from Material-UI
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        padding: theme.spacing(2, 8),
    }
})

function ListMoviePage(props) {
    const { classes } = props;
    let { type } = useParams();
    const dispatch = useDispatch();
    const popular = useSelector(state => state.main.popularMovies);
    const rated = useSelector(state => state.main.topRankedMovies);
    const title = type === 'popular' ? ' I film più popolari' : 'I film più votati';
    const movies = type === 'popular' ? popular : rated;

    useEffect(() => {
        dispatch(movieAction.getListMovies(type));
    }, [type, dispatch]);

    return (
        <Container className={classes.root} component='section'>
            <Typography component='h2' variant='h3' align='left' gutterBottom>{title}</Typography>
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

export default withStyles(styles)(ListMoviePage);