import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {
  NavBar,
  HomePage,
  Login,
  MoviesList,
  MovieDetails,
  PeopleDetails
} from './components';


class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div>
          <Switch>
            <Route exact path='/'>
              < HomePage />
            </Route>
            <Route path='/login' component={Login} />
            <Route path='/movies/popular' component={MoviesList} />
            <Route path='/movie/:id' component={MovieDetails} />
            <Route path='/person/:id' component={PeopleDetails} />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
