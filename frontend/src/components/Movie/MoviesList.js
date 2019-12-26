import React from 'react';
import { connect } from 'react-redux';

import {
    Link,
} from 'react-router-dom';

//import Axios from 'axios';

// Style
import './MoviesList.css'

class MoviesList extends React.Component {

    /*
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoading: true,
            error: null,
            genre: null,
        }
        if (this.props.match.params.genre)
            this.state.genre = this.props.match.params.genre
    }

    componentDidMount() {
        if (this.props.match.params.genre) {
            Axios.get(`http://127.0.0.1:8000/movie/api/genres/${this.props.match.params.genre}`)
                .then(response => this.setState({
                    movies: response.data
                }))
                .catch(err => this.setState({
                    error: err,
                    isLoading: false
                }))

        } else {
            Axios.get('http://127.0.0.1:8000/movie/api/getPopular/')
                .then(response => this.setState({
                    movies: response.data
                }))
                .catch(err => this.setState({
                    error: err,
                    isLoading: false
                }))
        }
    }*/


    render() {
        const { movies, typeList } = this.props
        let emptyList = (movies === undefined || movies.length === 0);
        return (
            <div className='container'>
                {typeList === 'POPULAR' ?
                    (<h2>Lista film popolari</h2>)
                    :
                    (<h2>Lista film maggiormente votati</h2>)
                }
                {!emptyList ? (
                    <ul>
                        {movies.map((movie, index) => (
                            <li key={index}>
                                <Link to={{
                                    pathname: `/movie/${movie.id}`
                                }}>
                                    {movie.title}
                                </Link>
                                {typeList === 'RANKING' ? (<p>Vote: {movie.vote_average}</p>) : (<p></p>)}
                            </li>
                        ))}
                    </ul>
                ) : (<p>Nessun film.</p>)
                }
            </div >
        );
    }
}

function mapStateToProps(state) {
    const { movies, typeList } = state.moviesList
    return { movies, typeList }
}

const actionCreator = {
}

const connectedMoviesList = connect(mapStateToProps, actionCreator)(MoviesList);
export { connectedMoviesList as MoviesList }