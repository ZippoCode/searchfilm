import React from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { connect } from 'react-redux';


import { history } from './_helpers/history'


import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { Login, AccountDetail, Register } from './components/Account';
import { MoviesList, MovieDetail, PeopleDetail } from './components/Movie';

import {
  HomePage,
  NavBar
} from './components';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: '',
    }

    history.listen((location, action) => {
      console.log(action, location.pathname, location.state);
    });
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('loggedIn') })
  }


  render() {
    return (
      <div>
        <Router history={history}>
          <NavBar />

          <Switch>
            <Route exact path='/' component={HomePage} />

            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/details' component={AccountDetail} />


            <Route exact path='/movies/top/popular' component={MoviesList} />
            <Route exact path='/movies/top/ranking' component={MoviesList} />
            <Route path='/movies/popular/:genre' component={MoviesList} />
            <Route path='/movie/:id' component={MovieDetail} />
            <Route path='/person/:id' component={PeopleDetail} />

            <Redirect from='*' to='/' />
          </Switch>
        </Router>
      </div>
    );
  }
}

const connectedApp = connect()(App);
export { connectedApp as App };
