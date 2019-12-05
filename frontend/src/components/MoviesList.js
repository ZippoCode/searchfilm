import React from 'react'
import {
    Link,
} from 'react-router-dom'


import Axios from 'axios'

// Style
import './MovieList.css'

class MoviesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoading: true,
            error: null
        }
    }

    componentDidMount() {
        Axios.get('http://127.0.0.1:8000/movie/api/getPopular/')
            .then(response => this.setState({
                movies: response.data
            }))
            .catch(err => this.setState({
                error: err,
                isLoading: false
            }))
    }


    render() {
        return (
            <div class = 'container'>
                <h2>I 10 film più popolari</h2>
                <ul>
                    {this.state.movies.map((movie, index) => (
                        <li key={index}>
                            <Link to={{
                                pathname: `/movie/${movie.id}`,
                            }}>
                                {movie.title}
                            </Link>
                        </li>
                    ))
                    }
                </ul>
            </div >
        );
    }
}

export default MoviesList;