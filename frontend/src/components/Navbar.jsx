import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Navbar,
    Nav,
    Button,
    Form,
    NavDropdown
} from 'react-bootstrap'


import { movieAction } from '../_actions/movie.action';
class NavBar extends Component {


    render() {
        const { user } = this.props;
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
                            <NavDropdown.Item onClick={this.props.viewTopRankingMovie}>
                                Top film più votati
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={this.props.viewTopPopularMovie}>
                                Top film più popolari
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Top Registi</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Top Attori</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {user
                        ?
                        <Form inline>
                            <Button
                                href='/details'
                                variant='outline-success'>
                                Visualizza Dettagli
                            </Button>
                            <Button
                                href='/login'
                                variant='outline-success'>
                                Logout
                            </Button>
                        </Form>
                        : <>
                            <Form inline>
                                <Button
                                    href='/login'
                                    variant="outline-success">
                                    Login
                                </Button>
                            </Form>
                        </>
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


function mapStateToProps(state) {
    //const { authentication, moviesList } = state;
    const { authentication } = state;
    const { user } = authentication;
    return { user }
}

const actionsCreator = {
    viewTopPopularMovie: movieAction.viewTopPopular,
    viewTopRankingMovie: movieAction.viewTopRanked,
}

const connectedNavBar = connect(mapStateToProps, actionsCreator)(NavBar);
export { connectedNavBar as NavBar };