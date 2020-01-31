import React from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { history } from './_helpers/history'

import CssBaseline from '@material-ui/core/CssBaseline';

import { LoginPage, ProfilePage, RegisterPage } from './components/Account';
import { MoviesList, MovieDetail, PeopleDetail } from './components/Movie';
import { AppBarCustom } from './components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { HomePage } from './components/Homepage';
import { FooterHomePage } from './components/Homepage/Footer';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#607D8B' },
    secondary: { main: '#B0BEC5' },
  },
  typography: {
    fontFamily: ['Roboto'].join(','),
  },
});

export function App() {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Router history={history}>
          <CssBaseline />
          <AppBarCustom />

          <Switch>
            <Route exact path='/' component={HomePage} />

            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/account-details' component={ProfilePage} />

            <Route exact path='/movies/top/popular' component={MoviesList} />
            <Route exact path='/movies/top/ranking' component={MoviesList} />
            <Route path='/movies/popular/:genre' component={MoviesList} />
            <Route path='/movie/:id' component={MovieDetail} />
            <Route path='/person/:id' component={PeopleDetail} />

            <Redirect from='*' to='/' />
          </Switch>
        </Router>
        <FooterHomePage />

      </React.Fragment>
    </ThemeProvider>
  );
}
