import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

//import logo from './logo.svg';

import {
  AppBarCustom,
  FooterCustom,
  HomePage,
  NotFoundPage,
} from './components';

import {
  LoginPage,
  AccountPage
} from './components/Account';

import {
  FullCastPage,
  MoviePage,
  PeopleDetail,
  ListMoviePage,
  ListMovieGenrePage,
} from './components/Movie';

// Importing from Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

// Importing from Styled-Components
import { ThemeProvider } from 'styled-components';

// Theme and CSS
import './App.css';
import { theme } from './components/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <CssBaseline />
        <header className='App-header'>
          <AppBarCustom />
          <Toolbar />
        </header>
        <div className='App-container'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/movie/:id' component={MoviePage} />
            <Route path='/movie/:id/cast' component={FullCastPage} />
            
            <Route exact path='/movies/:type' component={ListMoviePage} />
            <Route path='/movies/genre/:genre' component={ListMovieGenrePage} />

            <Route path='/person/:id' component={PeopleDetail} />

            <Route exact path='/login' component={LoginPage} />
            <Route path='/account-page' component={AccountPage} />

            <Route path='*' component={NotFoundPage} />
          </Switch>
        </div>
        <div className='App-Footer'>
          <FooterCustom />
        </div>
      </div>
    </ThemeProvider>
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