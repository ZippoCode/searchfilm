import React, { Fragment } from 'react';

import Axios from 'axios';



export default class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id : props.location.state,
            name: '',
            original_name: '',
            imdb_id: '',
            description: ''
        }
    }

    componentDidMount() {
        console.log(this.state.id);
        Axios.get(`http://127.0.0.1:8000/film/api/getFilm/${this.state.id}`)
            .then(response => {
                this.setState({
                    data: response.data,
                    name: response.data.title,
                    original_name: response.data.original_title,
                    imdb_id: response.data.imdb_id,
                    description: response.data.description,
                })
                console.log(response)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Fragment>
                <h1>Dettagli:</h1>
                {this.state.name}<hr />
                {this.state.original_name} <hr />
                {this.state.imdb_id}<hr />
                {this.state.description}
            </Fragment>
        )
    }
}