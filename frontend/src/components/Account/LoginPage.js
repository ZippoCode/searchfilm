import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../_actions/user.action';

import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Typography, TextField, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export function LoginPage() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = (event) => {
        if (event) {
            dispatch(userActions.login(email, password))
        }
    }
    /*
    const loggedIn = useSelector(state => state.authentication);
    const token = useSelector(state => state.authentication.user);
    if (loggedIn) { dispatch(userActions.logout(token)); }
    */

    return (
        <Container component='main' maxWidth='xs' >
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>Login</Typography>
                <form className={classes.form}>
                    <TextField
                        required
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        name='email'
                        type='email'
                        label='E-Mail'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        name='password'
                        type='password'
                        label='Password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <Button
                        fullWidth
                        className={classes.submit}
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    )
}