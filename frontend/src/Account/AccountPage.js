import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Axios from 'axios';

// Importing from Material-UI
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography'

const ListMovie = ({ array }) => {
    return (
        <List>
            {array.map((movie, index) =>
                <ListItem
                    button
                    key={index}
                    component={Link}
                    href={`/movie/${movie.movie}`}
                    color='inherit'
                >
                    {movie.title}
                </ListItem>)}
            <Typography component={Link} color='inherit'>Visualizzali tutti.</Typography>
        </List>
    )
}

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
                url: 'http://127.0.0.1:8000/account/api/get',
                headers: { 'Authorization': 'Bearer '.concat(token) }
            });
            setUser(response.data);
            setFavorite(response.data.favorites)
            setVote(response.data.voted)
        }
        fetchUser();
    }, [token])

    return (
        <div>
            {user &&
                <div className={classes.root}>
                    <Typography variant='h2'>Dettagli utenti</Typography>
                    <Typography variant='h4'>Utente: {user.first_name} {user.last_name}</Typography>
                    <Divider />
                    <Typography variant='h4'>
                        Statistiche:
                        </Typography>
                    <Typography variant='h5'>
                        <p>Numero di film visti: {favorite.length}</p>
                        <p>Numero di film votati: {vote.length} </p>
                    </Typography>
                    <Divider />
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <h2>Film preferiti</h2>
                            <ListMovie array={favorite} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <h2>Film votati</h2>
                            <ListMovie array={vote} />
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    )
}