import React from 'react';
import { createBrowserHistory } from 'history';
import { Switch, Route } from 'react-router-dom';

import {
    LoginPage,
    AccountPage,
    RegisterPage
} from '../Account';

import {
    DetailPeoplePage,
    FullCastPage,
    ListMoviePage,
    ListMovieGenrePage,
    MoviePage,
} from '../Movie';

import {
    AboutPage,
    ContactsPage,
    ContactUsPage,
    HomePage,
    NotFoundPage,
} from '../Pages';


export const history = createBrowserHistory();

export default function functionRouterPages() {
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/movie/:id' component={MoviePage} />
            <Route path='/movie/:id/cast' component={FullCastPage} />

            <Route exact path='/movies/:type' component={ListMoviePage} />
            <Route path='/movies/genre/:genre' component={ListMovieGenrePage} />

            <Route path='/person/:id' component={DetailPeoplePage} />

            <Route exact path='/login' component={LoginPage} />
            <Route path='/account-page' component={AccountPage} />
            <Route path='/register' component={RegisterPage} />

            <Route path='/about-us' component={AboutPage} />
            <Route path='/contacts' component={ContactsPage} />
            <Route path='/contact-us' component={ContactUsPage} />
            <Route path='*' component={NotFoundPage} />
        </Switch>
    )
}
