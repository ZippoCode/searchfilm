import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { changePassword } from '../../../actions/authentication.action';

// Import style from Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export function EditTab() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token) || '';
    const handleSubmit = useCallback(
        () => dispatch(changePassword(token, oldPassword, newPassword)),
        [dispatch, token, oldPassword, newPassword]
    );

    return (
        <Grid container direction='column'>
            <h3>Cambia password</h3>
            <form onSubmit={handleSubmit}>
                <Grid container direction='column'>
                    <TextField
                        label='Password precedente'
                        type='password'
                        value={oldPassword}
                        onChange={event => { setOldPassword(event.target.value) }}
                    />
                    {(newPassword.length > 0 && repeatedPassword.length > 0 && newPassword !== repeatedPassword) &&
                        <p>Le due password devono essere uguali</p>}
                    <TextField
                        label='Nuova Password'
                        type='password'
                        value={newPassword}
                        onChange={event => { setNewPassword(event.target.value) }}
                    />
                    <TextField
                        label='Ripeti la nuova Password'
                        type='password'
                        value={repeatedPassword}
                        onChange={event => { setRepeatedPassword(event.target.value) }}
                    />
                    <button type='submit'>Cambia</button>
                </Grid>
            </form>
        </Grid>
    )
}
