import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.css";


import {
  NavBar,
  HomePage,
  About,
  Login,
  MoviesList
} from './components';

import './App.css';


function App() {
  return (
    <Router>
      < NavBar />
      <Switch>
        <Router exact path='/'>
          < HomePage />
        </Router>
        <Router exact path='/about'>
          < About />
        </Router>
        <Router exact path='/login'>
          <Login />
        </Router>
        <Router exact path='/popularMovies'>
          < MoviesList />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
