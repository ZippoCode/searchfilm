import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Importing Actions
import { addRemoveMoviePreferite } from '../actions/user.action';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../constants/user.constants';


// Importing from Material-UI
import Button from '@material-ui/core/Button';

export function ButtonPreferite(props) {

    const { idMovie } = props;
    const history = useHistory();

    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token) || '';
    const favorites = useSelector(state => state.user.favorite) || [];
    const isFavorite = favorites.some(elem => elem.movie === idMovie)

    const handleAdd = useCallback(
        () => {
            if (token === '')
                history.replace('/login');
            dispatch(addRemoveMoviePreferite(token, idMovie, ADD_FAVORITE));
        },
        [dispatch, token, idMovie, history]
    );

    const handleRemove = useCallback(
        () => dispatch(addRemoveMoviePreferite(token, idMovie, REMOVE_FAVORITE)),
        [dispatch, token, idMovie]
    );

    return (
        <div>
            {isFavorite ? (
                <ButtonRemoveFavorite onClick={handleRemove} />
            ) : (
                    <ButtonAddFavorite onClick={handleAdd} />
                )}
        </div>
    )
}

const ButtonRemoveFavorite = ({ onClick }) => (
    <Button type='submit' onClick={onClick}>Rimuovi dai preferiti</Button>
);

const ButtonAddFavorite = ({ onClick }) => (
    <Button type='submit' onClick={onClick}>Aggiungi ai preferiti</Button>
)
