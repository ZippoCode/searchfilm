import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import logo from './logo.svg';

import {
  AppBarCustom,
  FooterCustom,
  HomePage
} from './components';

import {
  LoginPage,
  AccountPage
} from './components/Account';

import {
  MovieDetail,
  PeopleDetail,
  ViewListMovies,
} from './components/Movie';

// Importing from Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

//import './App.css';

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <header className='App-header'>
        <AppBarCustom />
        <Toolbar />
      </header>
      <div id='container'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/movie/:id' component={MovieDetail} />
          <Route path='/movies/:type' component={ViewListMovies} />
          <Route path='/person/:id' component={PeopleDetail} />

          <Route exact path='/login' component={LoginPage} />
          <Route path='/account-page' component={AccountPage} />
        </Switch>
      </div>
      <div id='footer'>
        <FooterCustom />
      </div>
    </div>
  )
}

export default App;
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/