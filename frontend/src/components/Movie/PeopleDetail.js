import React from 'react';

import Axios from 'axios';

import './PeopleDetail.css';


class PeopleDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actor: []
        }
    }

    componentDidMount() {
        Axios.get(`http://127.0.0.1:8000/person/api/get/${this.props.match.params.id}/`)
            .then(response => this.setState({
                actor: response.data
            }))
            .catch(err => this.setState({
                error: err,
            }))
    }

    render() {
        return (
            <div>
                <h1>Dettagli: </h1>
                <h3>Nome: {this.state.actor.first_name} </h3>
                <h3>Cognome: {this.state.actor.second_name}</h3>
                <h3>Tipo: {this.state.actor.type}</h3>
                <h3>Genere: {this.state.actor.gender}</h3>
                <h3>Data di nascita: {this.state.actor.birth_date}</h3>
                <h3>Luogo di nascita: {this.state.actor.place_of_birth}</h3>
            </div>
        );
    }
}

export default PeopleDetail;