import React from 'react';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import 'typeface-roboto';
import { SliderPopularMovie } from './SliderPopularMovie';
import { FormSearchMovie } from './FormSearchMovie';

const useStyles = makeStyles(theme => ({
    root: {
        background: '#1F2120',
    },
    body: {
        padding:'8px 4%',
    },
}));

export function HomePage() {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Grid container className={classes.body} spacing={2}>
                <Grid item>
                    <Typography color='primary' component='h1' variant='h1' gutterBottom>Ricerca un film</Typography>
                    <Typography color='secondary' component='h2' variant='h2'>Descrivi cosa vorresti vedere</Typography>
                </Grid>
                <Grid item>
                    <FormSearchMovie />
                </Grid>
                <Grid item xs={12}>
                    <Typography component='h3' variant='h3' color='primary'>I film più visti</Typography>
                    <SliderPopularMovie />
                </Grid>
            </Grid>
        </div>
    )

}