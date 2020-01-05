import React from 'react';
import { connect } from 'react-redux';

// Style
import './Homepage.css';
import {
    TextField,
    FormControl,
    Select,
    FormHelperText,
    Button,
    InputLabel,
    MenuItem,
} from '@material-ui/core'

import { movieAction } from '../_actions/movie.action'


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text_search: '',
            genre_choiced: '',
            genres: []
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/movie/api/genres`)
            .then(response => response.json())
            .then(data => {
                this.setState({ genres: data });
            })
            .catch(err => {
                this.setState({ data: err, isLoading: false });
            });
    }

    handleSearch() {
        const { text_search } = this.state;
        this.props.searchMovie(text_search)
    }

    handleChange = (event) => {
        this.setState({
            genre_choiced: event.target.value
        })
    }

    updateInputValue(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { genres, text_search } = this.state;

        return (
            <React.Fragment>
                <div className='Container-HomePage'>
                    <form className='Search-Movie'>
                        <h1> Ricerca Film </h1>
                        <TextField
                            name='text_search'
                            value={text_search}
                            onChange={this.updateInputValue}
                            placeholder="Titolo"
                        />
                        <Button onClick={this.handleSearch}> Invia </Button>
                    </form>
                    <FormControl>
                        <InputLabel id="genres-select-label">Genere</InputLabel>
                        <Select
                            labelId='genres-choices-label'
                            id='genres-of-movie'
                            value={this.state.genre_choiced}
                            onChange={this.handleChange}
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Scegli una tipologia di film</FormHelperText>
                    </FormControl>
                    <Button variant='contained' onClick={(event) => (
                        this.props.viewPopolarGenre(this.state.genre_choiced)
                    )}
                    >Ricerca
                    </Button>

                </div >
            </React.Fragment>
        );
    }

}


function mapPropsToState(state) {
    return { state };
}

const actionCreator = {
    searchMovie: movieAction.searchMovie,

    viewPopolarGenre: movieAction.viewTopPopularWithGenre,
    viewTopPopular: movieAction.viewTopPopular,

}


const connectedHomePage = connect(mapPropsToState, actionCreator)(HomePage);
export { connectedHomePage as HomePage };