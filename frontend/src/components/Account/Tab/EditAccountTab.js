import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../../_actions/user.action';

// Style Page
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { userService } from '../../../_service/user.service';

const StyledForm = styled.form`
    width: 100%;
    height: 100%
    display: flex;
    align-items: center;
`;


export function EditAccountTab() {
    const token  = useSelector(state => state.authentication.user.token);
    console.log(token)
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newNewPassword, setNewNewPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(userActions.changePassword(token, oldPassword, newPassword));
    }

    return (
        <div className='Change-Password' >
            <h3>Cambia password</h3>
            <StyledForm onSubmit={handleSubmit}>
                <TextField
                    variant='outlined'
                    label='Password precedente'
                    name='old_password'
                    type='password'
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    label='Nuova password'
                    name='new_password'
                    type='password'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    label='Digita nuovamente la password'
                    name='new_new_password'
                    type='password'
                    value={newNewPassword}
                    onChange={e => setNewNewPassword(e.target.value)}
                />
                <Button
                    block bssize='large'
                    type='submit'
                >
                    Cambia
                </Button>
            </StyledForm>
        </div>
    )
}