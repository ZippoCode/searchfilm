import React from 'react';
import {
  Router,
  Switch,
  Route,
  // withRouter
} from 'react-router-dom'


import { history } from './_helpers/history'


import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { Login } from './components/Login';
import { Register } from './components/Register';

import {
  NavBar,
  HomePage,
  MoviesList,
  MovieDetails,
  PeopleDetails,
  //  PrivateRoute,
  AccountDetails
} from './components';

class App extends React.Component {

  constructor(props) {
    super(props);

    history.listen((location, action) => {
      //this.props.clearAlert();
    })

  }


  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar />
          <Switch>
            <Route exact path='/'>
              < HomePage />
            </Route>

            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/details' component={AccountDetails} />


            <Route exact path='/movies/popular' component={MoviesList} />
            <Route path='/movies/popular/:genre' component={MoviesList} />
            <Route path='/movie/:id' component={MovieDetails} />
            <Route path='/person/:id' component={PeopleDetails} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
