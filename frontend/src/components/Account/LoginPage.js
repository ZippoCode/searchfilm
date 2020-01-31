import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../_actions/user.action';

import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Typography, TextField, Button, Grid } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
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

const StyledContainer = styled(Container)`
    height: 100%;
`;
const StyledPaper = styled.div`
    display: 'flex';
    margin-top: 64px;
    margin-bottom: 64px;
    flex-direction: 'column';
    align-items: 'center';
`;

function LoginPage() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const validateForm = email.length > 0 && password.length > 0;

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
            dispatch(userActions.login(email, password))
        }
    }


    return (
        <StyledContainer maxWidth='xs'>
            <CssBaseline />
            <StyledPaper>
                <Typography component='h3' variant='h3'>Login</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
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
                        fullWidth
                        error = {error}
                        helperText = {error && 'Password errata'}
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
                        disabled={!validateForm}
                        variant='contained'
                        color='primary'
                        type='submit'
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
            </StyledPaper>
        </StyledContainer>
    )
}

const MemorizedLoginPage = React.memo(LoginPage);
export { MemorizedLoginPage as LoginPage };