import React from 'react';

import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../../_actions/user.action'
import { history } from '../../_helpers/history'


// Style
import {
    FormControl,
    Select,
    Button,
    MenuItem
} from '@material-ui/core'
import './MovieDetails.css'

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            value_vote: '',
            cast: [],
            directors: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddVoteMovie = this.handleAddVoteMovie.bind(this);
        this.handleRemoveVoteMovie = this.handleRemoveVoteMovie.bind(this);

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

    handleChange = (event) => {
        this.setState({
            value_vote: event.target.value
        })
    }

    handleAdd() {
        const { user } = this.props;
        if (!user) {
            return history.push('/login')
        }
        const { id } = this.state.movie;
        this.props.put_movie(user, id);
    }

    handleRemove() {
        const { user } = this.props;
        const { id } = this.state.movie;
        this.props.remove_movie(user, id);
    }

    handleAddVoteMovie() {
        const { user } = this.props;
        if (!user) {
            return history.push('/login')
        }
        const { movie, value_vote } = this.state;
        const { id } = movie;
        this.props.add_vote_movie(user, id, value_vote);
    }

    handleRemoveVoteMovie() {
        const { user } = this.props;
        const { id } = this.state;
        this.props.remove_vote_movie(user, id);
    }

    render() {
        let { title, original_title, imdb_id,
            description, release_date, vote_average,
            vote_counter } = this.state.movie;
        let { value_vote } = this.state;
        let { user } = this.props;
        let button;
        if (user) {
            let { favorites, voted } = this.props;
            const isFavorite = favorites.some(elem => elem.title === title);
            if (isFavorite) {
                button = <ButtonRemoveFavorite onClick={this.handleRemove} />
            } else {
                button = <ButtonAddFavorite onClick={this.handleAdd} />
            }
            const isVoted = voted.some(elem => elem.title === title);
            if (isVoted) {
                const movie = voted.find(object => object.title === title)
                value_vote = movie.value_vote;
            }
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
                    <h3>Numero voti: {vote_counter}</h3>
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
                <p></p>
                <div>
                    <FormControl>
                        <Select
                            labelId='genres-choices-label'
                            id='vote-value'
                            value={value_vote}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>

                        </Select>
                    </FormControl>
                    <Button variant='contained' onClick={this.handleAddVoteMovie} >Vota</Button>
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
    const { user } = state.authentication;
    if (user) {
        const { favorites, voted } = user;
        return { user, favorites, voted };
    }
    return { 'None': 'None' };
}

const actionCreators = {
    put_movie: userActions.add_to_favorites,
    remove_movie: userActions.remove_to_favorites,
    add_vote_movie: userActions.add_vote,
    remove_vote_movie: userActions.remove_vote,
}

const connectedMovieDetails = connect(mapStateToProps, actionCreators)(MovieDetails);
export { connectedMovieDetails as MovieDetail };