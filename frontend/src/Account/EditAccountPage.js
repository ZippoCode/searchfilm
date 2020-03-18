import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Import Actions
import { AuthenticationActions } from '../redux/actions/authentication.action';

// Style
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        padding: theme.spacing(4, 12),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .MuiFormHelperText-root': {
            color: theme.palette.text.primary,
            fontSize: 14,
        }
    }
});

function EditAccountPage(props) {
    const { classes } = props;
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token) || null;
    const [user, setUser] = useState('');
    const [credential, setCredential] = useState({ oldPassword: '', newPassword: '' })
    const [repeatedPassword, setRepeatedPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios({
                method: 'GET',
                url: 'http://127.0.0.1:8000/account/api/get',
                headers: { 'Authorization': 'Bearer '.concat(token) }
            });
            setUser(response.data);
        }
        fetchUser();
    }, [token]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(AuthenticationActions.changePassword(token, credential.oldPassword, credential.newPassword));
    }

    const handleTyping = (event) => {
        setCredential({
            ...credential,
            [event.target.name]: event.target.value
        });
    };

    const validateForm = () => {
        return credential.newPassword !== repeatedPassword &&
            credential.newPassword.length > 0 && repeatedPassword.length > 0;
    }

    return (
        <Container component='section' className={classes.root}>
            {token &&
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.container}>
                        <Typography component='h4' variant='h4'>Modifica account</Typography>
                        <TextField
                            fullWidth
                            variant='outlined'
                            value={user.first_name}
                        />
                        <TextField
                            fullWidth
                            variant='outlined'
                            value={user.last_name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.container}>
                        <Typography component='h4' variant='h4'>Modifica la password</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                name='oldPassword'
                                value={credential.oldPassword}
                                onChange={handleTyping}
                                variant='outlined'
                                type='password'
                                size='medium'
                                helperText='Password precedente'
                            />
                            {validateForm() &&
                                <Typography color='error'>
                                    Le due password devono essere uguali
                                </Typography>
                            }
                            <TextField
                                fullWidth
                                name='newPassword'
                                value={credential.newPassword}
                                onChange={handleTyping}
                                variant='outlined'
                                type='password'
                                size='medium'
                                helperText='Nuova password'
                            />
                            <TextField
                                fullWidth
                                name='repeatedPassword'
                                value={repeatedPassword}
                                onChange={e => setRepeatedPassword(e.target.value)}
                                variant='outlined'
                                type='password'
                                size='medium'
                                helperText='Ripeti nuovamente la password'
                            />
                            <Button
                                fullWidth
                                type='submit'
                                variant='contained'
                                color='primary'
                            >
                                Modifica Password
                        </Button>
                        </form>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}

export default withStyles(styles)(EditAccountPage);