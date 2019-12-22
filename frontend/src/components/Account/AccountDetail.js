import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AccountDetails extends React.Component {

    render() {
        const { email, first_name, last_name, favorites, voted } = this.props;
        let emptyFavorites = (favorites === undefined || favorites.length === 0);
        let emptyVoted = (voted === undefined || voted.length === 0);
        return (
            <div className='container' >
                <h1>Dettagli Account: </h1>
                <h3>Email: {email}</h3>
                <h3>Name: {first_name}</h3>
                <h3>Cognome: {last_name}</h3>
                <h3>I tuoi film preferiti</h3>
                {(() => {
                    if (!emptyFavorites) {
                        return <ul>
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
                    }
                })()}
                <h3>I tuoi film votati</h3>
                {(() => {
                    if (!emptyVoted) {
                        return <ul>
                            {voted.map((movie, index) => (
                                <li key={index}>
                                    <Link to={{
                                        pathname: `/movie/${movie.movie}`
                                    }}>
                                        {movie.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    }
                })()}
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { email, first_name, last_name, favorites, voted } = user;
    return { email, first_name, last_name, favorites, voted }
}

const actionCreators = {

}

const connectedAccountDetail = connect(mapStateToProps, actionCreators)(AccountDetails);
export { connectedAccountDetail as AccountDetail };