import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';

// Import Actions
import { movieAction } from '../redux/actions/main.action';

// Importing custom components
import MovieItem from './MovieItem';

// Importing from Material-UI
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Importing from Material-UI-Lab
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const styles = theme => ({
    root: {
        padding: theme.spacing(4, 8),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1, 4),
        }
    },
    pagination: {
        paddingTop: theme.spacing(3),
    }
})

function useListMovies(type, page) {
    const dispatch = useDispatch();
    const popular = useSelector(state => state.main.resultPopular);
    const rated = useSelector(state => state.main.resultRating);

    useEffect(() => {
        dispatch(movieAction.getListMovies(type, page));
    }, [dispatch, type, page]);

    switch (type) {
        case 'popular':
            return popular;
        case 'rated':
            return rated;
        default:
            return popular
    }
}

function ListMoviePage(props) {
    const { classes } = props;
    let { type } = useParams();
    const numPagePopular = useSelector(state => state.main.numPagePopular);
    const numPageRating = useSelector(state => state.main.numPageRating);

    const title = type === 'popular' ? ' I film più popolari' : 'I film più votati';
    const numPage = type === 'popular' ? numPagePopular : numPageRating;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page', 10)) || 1;

    const movies = useListMovies(type, page);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

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
            <Pagination
                count={numPage}
                page={page}
                size='large'
                className={classes.pagination}
                renderItem={item => (
                    <PaginationItem
                        component={Link}
                        to={`${location.pathname}${item.page === 1 ? '' : `?page=${item.page}`}`}
                        {...item}
                    />
                )}
            />
        </Container>
    )
}

export default withStyles(styles)(ListMoviePage);