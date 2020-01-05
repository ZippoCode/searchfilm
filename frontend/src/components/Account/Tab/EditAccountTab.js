import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../../_actions/user.action';

// Style Page
import { Form, Button } from 'react-bootstrap';

export function EditAccountTab() {
    /*
    validateForm() {
        var { old_password, new_password, new_new_password } = this.state;
        return (
            old_password.length > 0 && new_password.length > 0 && new_new_password.length > 0
        );
    }



    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.props;
        const { old_password, new_password } = this.state;
        this.props.changePassword(user, old_password, new_password);
    }
    */

    const { user } = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newNewPassword, setNewNewPassword] = useState('');

    return (
        <div className='Change-Password' >
            <h3>Cambia password</h3>
            <main>
                <Form.Group controlId='old-password' bssize='large'>
                    <Form.Label>Old passoword</Form.Label>
                    <Form.Control
                        autoFocus
                        name='old_password'
                        type='password'
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='new_password' bssize='large'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name='new_password'
                        type='password'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='new-new-password' bssize='large'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name='new_new_password'
                        type='password'
                        value={newNewPassword}
                        onChange={e => setNewNewPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="form-group">
                    <Button
                        block bssize='large'
                        onClick={() => dispatch(userActions.changePassword(user, oldPassword, newPassword))}
                    //disabled={!this.validateForm()}
                    >
                        Cambia
                        </Button>
                </div>
            </main>
        </div>
    )
}