import React from 'react';
import PropTypes from 'prop-types';

import MainForm from './MainForm';

// Style Material-UI
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const backgroundImage =
    'https://images.unsplash.com/photo-1458053688450-eef5d21d43b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80'

const styles = theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        backgroundImage: `url(${backgroundImage})`,
        color: theme.palette.common.white,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        paddingTop: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            height: '60vh',
            minHeight: 600,
            maxHeight: 1300,
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.7)',
        opacity: 1,
    },
    container: {
        position: 'relative',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        //alignItems: 'center',
    },
    title: {
        fontFamily: 'Julius Sans One, sans-serif',
    },
    subtitle: {
        fontFamily: 'Open Sans Condensed, sans-serif',
        letterSpacing: 3,
    }
});

function SearchMovie(props) {
    const { classes } = props;

    return (
        <Paper component='section' className={classes.root}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <div className={classes.overlay} />
            <Container className={classes.container}>
                <Typography color='inherit' variant='h1' className={classes.title}>
                    Ricerca un film
                </Typography>
                <Typography color='inherit' variant='h4' component='h5' className={classes.subtitle}>
                    Dammi qualche informazione e ti consiglierò cosa guardare ...
                </Typography>
                <MainForm />
            </Container>
        </Paper>
    )
}

SearchMovie.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchMovie);