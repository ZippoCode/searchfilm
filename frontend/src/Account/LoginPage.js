import React, { useState } from 'react';

// Importing from React-Redux
import { useDispatch, useSelector } from 'react-redux';

// Import from Action
import { AuthenticationActions } from '../redux/actions/authentication.action';

// Importing from Material-UI
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Importing style from CSS
import '../Animation.css';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random/?cinema)',
        backgroundColor: theme.palette.primary.main,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        '& .MuiOutlinedInput-root': {
            color: theme.palette.primary.main,
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
        },
        '& .MuiFormLabel-root': {
            color: theme.palette.primary.main,
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export function LoginPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [credential, setCredential] = useState({
        email: '',
        password: '',
    });
    const error = useSelector(state => state.authentication.error) || false;

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(AuthenticationActions.login(credential.email, credential.password))
    }

    const handleChange = (event) => {
        setCredential({
            ...credential,
            [event.target.name]: event.target.value,
        })
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={false} sm={4} md={5} className={classes.image} />
            <Grid item xs={12} sm={8} md={7} component={Paper} elevation={0} square>
                <div className={classes.paper}>
                    <Typography component='h3' variant='h4' gutterBottom>Login</Typography>
                    <form
                        id='form'
                        onSubmit={handleSubmit}
                        className={`${classes.form} ${error ? 'error' : ''}`}
                        noValidate
                    >
                        {error ?
                            <Typography component='p' variant='body1' color='error'>E-mail o password errate</Typography>
                            : <p></p>
                        }
                        <TextField
                            fullWidth
                            required
                            variant='outlined'
                            margin='normal'
                            label='E-Mail'
                            name='email'
                            value={credential.email}
                            onChange={handleChange}
                            // Error Effect
                            error={error}
                        />
                        <TextField
                            fullWidth
                            variant='outlined'
                            margin='normal'
                            label='Password'
                            type='password'
                            name='password'
                            value={credential.password}
                            onChange={handleChange}
                            // Error Effect
                            error={error}
                        />
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            Login
                        </Button>
                    </form>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                        </Link>
                        </Grid>
                        <Grid item xs variant='body2'>
                            <Link href='/register'>Non hai un account. Registrati</Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}