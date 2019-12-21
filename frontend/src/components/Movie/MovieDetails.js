import React from 'react';

import Axios from 'axios';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { userActions } from '../../_actions/user.action'


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
            cast: [],
            directors: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

    }

    componentDidMount() {
        Axios.get(`http://127.0.0.1:8000/movie/api/get/${this.props.match.params.id}/`)
            .then(response => this.setState({
                movie: response.data,
                cast: response.data.actors,
                directors: response.data.directors
            }))
            .catch(err => this.setState({
                error: err,
            }))
    }

    handleAdd() {
        const { user } = this.props;
        const { id } = this.state.movie;
        this.props.put_movie(user, id);
    }

    handleRemove() {
        const { user } = this.props;
        const { id } = this.state.movie;
        this.props.remove_movie(user, id);
    }

    render() {
        let { title, original_title, imdb_id,
            description, release_date, vote_average,
            vote_count } = this.state.movie;
        let button;
        let { favorites } = this.props;
        let isFavorite = favorites.some(elem => elem.title === title);
        if (isFavorite) {
            button = <ButtonRemoveFavorite onClick={this.handleRemove} />
        } else {
            button = <ButtonAddFavorite onClick={this.handleAdd} />
        }
        return (
            <div className='container'>
                <div>
                    <h1>Dettagli Film </h1>
                    <h3>Titolo: {title}</h3>
                    <h3>Titolo originale: {original_title}</h3>
                    <h3>IMDB CODE: {imdb_id}</h3>
                    <h3>Descrizione: {description}</h3>
                    <h3>Data rilascio: {release_date}</h3>
                    <h3>Voto medio: {vote_average}</h3>
                    <h3>Numero voti: {vote_count}</h3>
                </div>
                <h3>Attori:</h3>
                <ul>
                    {this.state.cast.map((actor, idx) => (
                        <li key={idx}>
                            <Link to={{
                                pathname: `/person/${actor.person_id}/`
                            }}>{actor.person}
                            </Link> - {actor.name_character}</li>
                    ))}
                </ul>
                <h3>Registi:</h3>
                <ul>
                    {this.state.directors.map((director, idx) => (
                        <li key={idx}>
                            <Link to={{
                                pathname: `/person/${director.id_person}`
                            }}>
                                <p>{director.first_name} {director.second_name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div>
                    {button}
                </div>
            </div>
        );
    }
}

function ButtonAddFavorite(props) {
    return <Button onClick={props.onClick}>Aggiungi ai preferiti</Button>
}

function ButtonRemoveFavorite(props) {
    return <Button onClick={props.onClick}>Rimuovi dai preferiti</Button>
}

function mapStateToProps(state) {
    const { user } = state.userAddRemoveMovie;
    const { favorites } = user
    return { user, favorites };
}

const actionCreators = {
    put_movie: userActions.add_to_favorites,
    remove_movie: userActions.remove_to_favorites

}

const connectedMovieDetails = connect(mapStateToProps, actionCreators)(MovieDetails);
export { connectedMovieDetails as MovieDetail };