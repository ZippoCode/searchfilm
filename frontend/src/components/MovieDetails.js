import React from 'react';

import Axios from 'axios';

import {
    Link
} from 'react-router-dom';


// Style
import {
    Button
} from 'react-bootstrap';
import './MovieDetails.css'

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            title: '',
            original_title: '',
            description: '',
            release_date: '',
            vote_average: 0,
            vote_count: 0,
            cast: [],
            directors: [],
        }
    }

    componentDidMount() {
        Axios.get(`http://127.0.0.1:8000/movie/api/get/${this.props.match.params.id}/`)
            .then(response => this.setState({
                movie: response.data,
                title: response.data.title,
                original_title: response.data.original_title,
                imdb_id: response.data.imdb_id,
                description: response.data.description,
                vote_average: response.data.vote_average,
                vote_count: response.data.vote_count,
                cast: response.data.actors,
                directors: response.data.directors
            }))
            .catch(err => this.setState({
                error: err,
            }))
    }

    render() {
        return (
            <div className='container'>
                <h1>Dettagli Film </h1>
                <h3>Titolo: {this.state.title}</h3>
                <h3>Titolo originale: {this.state.original_title}</h3>
                <h3>IMDB CODE: {this.state.imdb_id}</h3>
                <h3>Descrizione: {this.state.description}</h3>
                <h3>Data rilascio: {this.state.release_date}</h3>
                <h3>Voto medio: {this.state.vote_average}</h3>
                <h3>Numero voti: {this.state.vote_count}</h3>
                <ul>
                    {this.state.cast.map((actor, idx) => (
                        <li key={idx}>
                            <Link to={{
                                pathname: `/person/${actor.person_id}/`
                            }}>{actor.person}
                            </Link> - {actor.name_character}</li>
                    ))}
                </ul>
                <ul>
                    {this.state.directors.map((director, idx) => (
                        <li key={idx}>Direttori:
                        <Link to={{
                                pathname: `/person/${director.id_person}`
                            }}>{director.second_name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Button>
                    Aggiungi ai preferiti
                </Button>
                <Button>Aggiungi alla watchlist</Button>
            </div>
        );
    }
}

export default MovieDetails;