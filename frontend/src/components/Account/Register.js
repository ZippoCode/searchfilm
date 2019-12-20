import React from 'react';
import { connect } from 'react-redux';


import { Form, Button } from 'react-bootstrap';

import { userActions } from '../../_actions/user.action';



import './Register.css';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                first_name: '',
                last_name: '',
                username: '',
                password: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { user } = this.state;
        return user.email.length > 0 && user.first_name.length > 0 && user.last_name.length > 0 && user.password.length > 0;
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { user } = this.state;
        user.username = this.state.user.email;
        this.props.register(user);
    }

    render() {
        const { email, first_name, last_name, password } = this.state;
        return (
            <div className='Register' >
                <h3>Registrati</h3>
                <Form onSubmit={(event) => { this.handleSubmit(event) }}>
                    <Form.Group controlId='email' bssize='large'>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            autoFocus
                            name='email'
                            type='email'
                            value={email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='first_name' bssize='large'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            name='first_name'
                            type='text'
                            value={first_name}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='last_name' bssize='large'>
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                            name='last_name'
                            type='text'
                            value={last_name}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='password' bssize='large'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name='password'
                            type='password'
                            value={password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <div className="form-group">
                        <Button
                            block bssize='large'
                            disabled={!this.validateForm()}
                            type='Submit'
                        >
                            Registrati
                </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering }
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register }