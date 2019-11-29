import React from 'react'
import { Form, Button } from 'react-bootstrap';

import './Login.css';

export default function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    return (
        <div className='Login'>
            <Form onSubmit='handleSubmit'>
                <Form.Group controlId='email' bsSize='large'>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        autoFocus
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password' bsSize='large'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block bsSize='large' disabled={!validateForm()} type='Submit'>
                    Login
                </Button>
            </Form>
        </div>
    )
}