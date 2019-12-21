import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AccountDetails extends React.Component {

    render() {
        const { email, first_name, last_name, favorites } = this.props;
        return (
            <div className='container' >
                <h1>Dettagli Account: </h1>
                <h3>Email: {email}</h3>
                <h3>Name: {first_name}</h3>
                <h3>Cognome: {last_name}</h3>
                <h3>I tuoi film preferiti</h3>
                <ul>
                    {favorites.map((movie, index) => (
                        <li key={index}>
                            <Link to={{
                                pathname: `/movie/${movie.movie}`
                            }}>
                                {movie.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { email, first_name, last_name, favorites } = user;
    return { email, first_name, last_name, favorites }
}

const actionCreators = {

}

const connectedAccountDetail = connect(mapStateToProps, actionCreators)(AccountDetails);
export { connectedAccountDetail as AccountDetail };