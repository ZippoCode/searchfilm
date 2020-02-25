import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Importing from React-Redux
import { useDispatch, useSelector } from 'react-redux';

// Import from Action
import { login } from '../../redux/actions/authentication.action';
import { history } from '../../helpers/history';


// Importing from Material-UI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const logged = useSelector(state => state.authentication.logged) || false;
    const error = useSelector(state => state.authentication.error) || false;
    const location = useLocation();

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
            dispatch(login(email, password))
        }
    }

    console.log(location);

    useEffect(() => {
        if (logged) {
            let { from } = location.state || { from: { pathname: '/' } }
            history.replace(from);
        }
    })

    return (
        <Grid container>
            <Grid item xs={false} sm={4} md={5} />
            <Grid item xs={12} sm={8} md={7} component={Paper}>
                <h2>Login</h2>
                {error && (<p>E-mail o password errate</p>)}
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='E-Mail'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                    >
                        Login
                    </Button>
                </form>
                <Grid container>
                    <Grid item xs>
                        <Link to='#'>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link to='/register'>Non hai un account. Registrati</Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}