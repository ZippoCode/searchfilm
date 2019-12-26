import React from 'react'
import {
    Link,
    //    withRouter
} from 'react-router-dom';

import { connect } from 'react-redux'
import { userActions } from '../../_actions/user.action'



// Style
import { Form, Button } from 'react-bootstrap';
import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.token)
            this.props.logout(this.props.token); // Reset Login State

        this.state = {
            email: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    handleSubmit(event) {
        event.preventDefault();

        const { email, password } = this.state;
        this.props.login(email, password);
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className='Login' >
                <h3>Login</h3>
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
                            Login
                        </Button>
                        <Link to='/register' className='btn btn-link'>Registrati</Link>
                    </div>
                </Form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication;
    if (loggedIn) {
        const { token } = state.authentication.user;
        return { loggingIn, token }
    }
    return { loggingIn };
}

const actionsCreators = {
    login: userActions.login,
    logout: userActions.logout
}

const connectedLoginPage = connect(mapStateToProps, actionsCreators)(Login);
export { connectedLoginPage as Login };