import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';

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

// Import constants
import * as URL from '../helpers/matcher';

const styles = theme => ({
    root: {
        padding: theme.spacing(4, 8),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4, 2),
        }
    }
})

function ListMoviesLastPage(props) {
    const { classes } = props;
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page', 10)) || 1;

    const [movies, setMovies] = React.useState(null);
    const [numPage, setNumPage] = React.useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL.GETLASTMOVIE.concat(`page=${page}`));
                setMovies(response.data.results);
                setNumPage(Math.floor(response.data.count / 10));
            } catch (error) { console.log(error) }
        }
        fetchData();
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <Container className={classes.root} component='section'>
            <Typography
                component='h2'
                variant='h3'
                align='left'
                gutterBottom
            >
                I film più recenti
            </Typography>
            <Grid container item xs={12} spacing={1}>
                {movies && movies.map(movie => (
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

export default withStyles(styles)(ListMoviesLastPage);