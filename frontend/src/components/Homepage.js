import React from 'react';

import axios from 'axios';

import {
    Link,
} from 'react-router-dom'

// Style
import './Homepage.css'
import {
    FormControl,
    Select,
} from '@material-ui/core'





class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            data: [],
            isLoading: false,
            type_choise: 'Scegli una tipologia',
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
            type_choise: event.target.value
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
                        <button onClick={this.handleClick} disabled={this.state.isLoading}> Invia </button>
                        <ul>
                            {this.state.data.map(film => {
                                return <li key={film.title}> {film.title} con {film.imdb_id} </li>;
                            })}
                        </ul>
                    </form>
                    <Link to='/movies/popular'>I 10 film più popolari</Link>
                    <div>
                        <FormControl>
                            <Select
                                labelId='type-of-movie-label'
                                id='type-of-movie'
                            >
                                {this.state.genres.map((genre) => (
                                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                                ))}

                            </Select>
                        </FormControl>
                        <button>Ricerca</button>
                    </div>

                </div>
            </div>
        );
    }

}

export default HomePage