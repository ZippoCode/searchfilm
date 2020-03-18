import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
    LoginPage, AccountPage, EditAccountPage, ListFullMoviePage, RegisterPage,
} from '../Account';

import {
    DetailPeoplePage, FullCastPage, ListMoviePage, ListMovieGenrePage, ListMoviesLastPage, MoviePage,
} from '../Movie';

import {
    AboutPage, ContactsPage, ContactUsPage, HomePage, NotFoundPage,
} from '../Pages';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

function NavigationRouter() {
    return (
        <Switch>

            <Route exact path='/' component={HomePage} />
            <Route exact path='/movie/:id' component={MoviePage} />
            <Route path='/movie/:id/cast' component={FullCastPage} />

            <Route exact path='/movies/last-movie' component={ListMoviesLastPage} />
            <Route exact path='/movies/:type' component={ListMoviePage} />
            <Route path='/movies/genre/:genre' component={ListMovieGenrePage} />

            <Route path='/person/:id' component={DetailPeoplePage} />

            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/account' component={AccountPage} />
            <PrivateRoute exact path='/account/edit' component={EditAccountPage} />
            <PrivateRoute exact path='/account/fullMovies' component={ListFullMoviePage} />

            <Route path='/register' component={RegisterPage} />

            <Route path='/about-us' component={AboutPage} />
            <Route path='/contacts' component={ContactsPage} />
            <Route path='/contact-us' component={ContactUsPage} />

            <Route path='*' component={NotFoundPage} />
        </Switch>
    )
}

export default NavigationRouter;

