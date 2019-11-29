import React, { Fragment } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Link,
} from 'react-router-dom'


import Axios from 'axios'


import MovieDetails from './MovieDetail';

export default class MoviesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            movie: ''
        }
    }


    componentDidMount() {
        Axios.get('http://127.0.0.1:8000/film/api/getPopularMovies/')
            .then(response => {
                this.setState({ movies: response.data })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Router>
                <Fragment>
                    <h2>I 10 film più popolari</h2>
                    <ul>
                        {this.state.movies.map((film, idx) => {

                            return (
                                <li key={idx}>
                                    <Link to={{
                                        pathname: '/movie',
                                        state: { id: film.film_id}
                                    }}>
                                        {film.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </Fragment>
                <Switch>
                    <Router exact path='/movie'>
                        <MovieDetails />
                    </Router>
                </Switch>

            </Router>
        )
    }
}