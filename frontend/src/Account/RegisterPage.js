import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../redux/actions/registration.action';

// Style
import { Container, CssBaseline, Typography, TextField, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),

        '& .MuiOutlinedInput-root': {
            color: theme.palette.primary.dark,

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
    },
}));

function RegisterPage() {

    const classes = useStyles();
    const error = useSelector(state => state.registration.error);
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const updateValue = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = () => {
        user.username = user.email;
        dispatch(register(user));
    };

    return (
        <Container component="main" maxWidth='xs' >
            <CssBaseline />
            <div className={classes.paper} >
                <Typography component='h1' variant='h5'>Registrati</Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        fullWidth
                        name='first_name'
                        type='text'
                        variant='outlined'
                        label='Name'
                        margin='normal'
                        value={user.first_name}
                        onChange={updateValue}
                    />
                    <TextField
                        fullWidth
                        name='last_name'
                        type='text'
                        variant='outlined'
                        label='Surname'
                        margin='normal'
                        value={user.last_name}
                        onChange={updateValue}
                    />
                    <TextField
                        autoFocus
                        fullWidth
                        error={error}
                        helperText={error && 'E-mail già presente.'}
                        name='email'
                        type='email'
                        variant='outlined'
                        label='E-Mail'
                        margin='normal'
                        value={user.email}
                        onChange={updateValue}
                    />
                    <TextField
                        fullWidth
                        name='password'
                        type='password'
                        variant='outlined'
                        label='Password'
                        margin='normal'
                        value={user.password}
                        onChange={updateValue}
                    />
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                    >
                        Registrati
                </Button>
                </form>
            </div>
        </Container >
    )
}

export default RegisterPage;