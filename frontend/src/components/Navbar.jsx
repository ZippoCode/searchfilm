import React, { Component } from 'react';

import {
    Navbar,
    Nav,
    Button,
    Form,
    NavDropdown
} from 'react-bootstrap'

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    Ricerca Film
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home Page</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <NavDropdown title="Top" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Top film più votati</NavDropdown.Item>
                            <NavDropdown.Item href="/movies/popular">Top film più popolari</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Top Registi</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Top Attori</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <Button
                            href='/login'
                            variant="outline-success">
                            Login
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;