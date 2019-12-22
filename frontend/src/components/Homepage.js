import React from 'react';
import { connect } from 'react-redux';


import axios from 'axios';

import {
    Link,
} from 'react-router-dom'

// Style
import './Homepage.css'
import {
    FormControl,
    Select,
    FormHelperText,
    Button,
    InputLabel,
    MenuItem
} from '@material-ui/core'


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            data: [],
            isLoading: false,
            genre_choiced: '',
            genres: []
        };
        this.click = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios
            .get(`http://127.0.0.1:8000/movie/api/genres`)
            .then((response) => {
                this.setState({ genres: response.data });
            })
            .catch((err) => {
                this.setState({ data: err, isLoading: false });
                console.log(err);
            });
    }

    handleClick() {
        this.setState({ isLoading: true });
        axios
            .get(`http://127.0.0.1:8000/movie/api/search/${this.state.inputValue}/`)
            .then((response) => {
                this.setState({ data: response.data, isLoading: false });
            })
            .catch((err) => {
                this.setState({ data: err, isLoading: false });
                console.log(err);
            });
    }

    handleChange = (event) => {
        this.setState({
            genre_choiced: event.target.value
        })
    }

    updateInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        return (
            <div className='container'>

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h1> Ricerca Film </h1>
                        <label>
                            Inserisci un titolo:
                    <input
                                type="text"
                                value={this.state.inputValue}
                                onChange={this.updateInputValue}
                                placeholder="Titolo"
                            />
                        </label>
                        <Button onClick={this.handleClick} disabled={this.state.isLoading}> Invia </Button>
                        <ul>
                            {this.state.data.map(film => {
                                return <li key={film.title}> {film.title} con {film.imdb_id} </li>;
                            })}
                        </ul>
                    </form>
                    <Link to='/movies/popular'>I 10 film più popolari</Link>
                    <div>
                        <FormControl>
                            <InputLabel id="genres-select-label">Genere</InputLabel>
                            <Select
                                labelId='genres-choices-label'
                                id='genres-of-movie'
                                value={this.state.genre_choiced}
                                onChange={this.handleChange}
                            >
                                {this.state.genres.map((genre) => (
                                    <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Scegli una tipologia di film</FormHelperText>
                        </FormControl>
                        <Button variant='contained' onClick={(event) => (
                            this.props.history.push(`/movies/popular/${this.state.genre_choiced}/`)
                        )}
                        >Ricerca
                        </Button>
                    </div>

                </div>
            </div >
        );
    }

}

const connectedHomePage = connect()(HomePage);
export { connectedHomePage as HomePage };