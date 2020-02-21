import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importing from React-Redux
import { useDispatch, useSelector } from 'react-redux';

// Import from Action
import { login } from '../../actions';

// Importing from Material-UI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const error = useSelector(state => state.authentication.error) || false;

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
            dispatch(login(email, password))
        }
    }

    return (
        <Grid container component='main' style={{ height: '100vh' }}>
            <Grid item xs={false} sm={4} md={5} />
            <Grid item xs={12} sm={8} md={7}>
                <h2>Login</h2>
                {error && (<p>E-mail o password errate</p>)}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='E-Mail'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        fullWidth
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