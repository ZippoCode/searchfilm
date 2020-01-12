import React, { useState, useEffect } from 'react';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import 'typeface-roboto';
import { SliderPopularMovie } from './SliderPopularMovie';
import { FooterHomePage } from './Footer';
import { FormSearchMovie } from './FormSearchMovie';

const PATH_POPULAR = 'http://127.0.0.1:8000/movie/api/topPopular';

const useStyles = makeStyles(theme => ({
    root: {
        background: '#1F2120',
    },
    body: {
        flexGrow: 1,
        padding: '10px 5%',
    },
    headerPaper: {
        background: theme.palette.primary.main,
        direction: 'column',
        justify: 'center',
        borderRadius: '16',
    },
    containerListPopularMovies: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
}));

export function HomePage() {
    const classes = useStyles();


    const [popularMovie, setPopularMovie] = useState([]);

    useEffect(() => {
        const fetchDataPopularMovies = async () => {
            const result = await fetch(PATH_POPULAR)
                .then(response => response.json())
                .then(data => { return data })
                .catch(error => console.log(error));
            setPopularMovie(result);
        }
        fetchDataPopularMovies();
    }, []);

    return (
        <div className={classes.root} >
            <Grid container className={classes.body} spacing={2}>
                <Grid item xs={12}>
                    <Box >
                        <Typography color='primary' component='h1' variant='h1' gutterBottom>Ricerca un film</Typography>
                        <Typography color='secondary' component='h2' variant='h2'>Descrivi cosa vorresti vedere</Typography>
                    </Box>
                    <FormSearchMovie />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' color='primary'>I film più visti</Typography>
                    <SliderPopularMovie popularMovie={popularMovie} />
                </Grid>
            </Grid>
            <FooterHomePage />
        </div>
    )

}