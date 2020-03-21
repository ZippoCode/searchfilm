import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Axios from 'axios';

import MoviesButton from './components/MoviesButton';

import * as URL from '../helpers/matcher';

// Importing from Material-UI
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 8),
        color: theme.palette.secondary.main,
        textAlign: 'start',
    }
}))

export function AccountPage() {

    const classes = useStyles();
    const token = useSelector(state => state.authentication.token) || null;
    const [user, setUser] = useState('');
    const [favorite, setFavorite] = useState([]);
    const [vote, setVote] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await Axios({
                method: 'GET',
                url: URL.GETINFOACCOUNT,
                headers: { 'Authorization': 'Bearer '.concat(token) }
            });
            setUser(response.data);
            setFavorite(response.data.favorites.slice(0, 5))
            setVote(response.data.voted.slice(0, 5))
        }
        fetchUser();
    }, [token]);

    return (
        <div>
            {user &&
                <div className={classes.root}>
                    <Typography variant='h2'>Dettagli utente</Typography>
                    <Typography variant='h4' gutterBottom>{user.first_name} {user.last_name}</Typography>
                    <Divider />
                    <Typography variant='h4'>
                        Statistiche:
                        </Typography>
                    <Typography variant='h5'>
                        <p>Numero di film visti: {favorite.length}</p>
                        <p>Numero di film votati: {vote.length} </p>
                    </Typography>
                    <Divider />
                    <Container>
                        <Grid container alignItems='center'>
                            <h2>Film preferiti</h2>
                            <Link
                                component={RouterLink}
                                to={{
                                    pathname: '/account/fullMovies',
                                    state: { type: 'favorite' }
                                }}
                                style={{ marginLeft: '16px' }}
                            >
                                Visualizzali tutti
                            </Link>
                        </Grid>
                        <MoviesButton movies={favorite} />
                    </Container>
                    <Container>
                        <Grid container alignItems='center'>
                            <h2>Film votati</h2>
                            <Link
                                component={RouterLink}
                                to={{
                                    pathname: '/account/fullMovies',
                                    state: { type: 'voted' }
                                }}
                                style={{ marginLeft: '16px' }}
                            >
                                Visualizzali tutti
                            </Link>
                        </Grid>

                        <MoviesButton movies={vote} />
                    </Container>
                </div>
            }
        </div>
    )
}