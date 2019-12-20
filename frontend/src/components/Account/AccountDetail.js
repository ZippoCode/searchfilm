import React from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

class AccountDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            movies: []
        }
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        axios.get('http://127.0.0.1:8000/account/api/movies',
            {
                headers: {
                    'Authorization': 'Token '.concat(user.token)
                }
            })
            .then(response => {
                this.setState({
                    email: response.data.username,
                    movies: response.data.favorites
                })
            });
    }


    render() {
        const { email, movies } = this.state;
        return (
            <div className='container' >
                <h1>Dettagli Account: </h1>
                <h3>Email: {email}</h3>
                <h3>I tuoi film preferiti</h3>
                <ul>
                    {movies.map((movie, index) => (
                        <li key={index}>
                            <Link to={{
                                pathname: `/movie/${movie.movie}`
                            }}>
                                {movie.title}
                            </Link>
                        </li>
                    ))
                    }
                </ul>
            </div>
        );
    }

}

export default AccountDetails;