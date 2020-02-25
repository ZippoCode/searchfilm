import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Importing Actions
import { addRemoveMoviePreferite } from '../redux/actions/user.action';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../redux/constants/user.constants';


// Importing from Material-UI
import Button from '@material-ui/core/Button';

// Importing history
import { history } from '../helpers/history';


export function ButtonPreferite(props) {

    const { idMovie } = props;
    const location = useLocation();

    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token) || undefined;
    const favorites = useSelector(state => state.user.favorite) || [];
    const isFavorite = favorites.some(elem => elem.movie === idMovie)

    const handleAdd = useCallback(
        () => {
            token ?
                dispatch(addRemoveMoviePreferite(token, idMovie, ADD_FAVORITE))
                :
                history.push('/login', { from: location.pathname });
        }, [dispatch, token, idMovie, location.pathname]
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
    <Button type='submit' variant='contained' onClick={onClick}>Rimuovi dai preferiti</Button>
);

const ButtonAddFavorite = ({ onClick }) => (
    <Button type='submit' variant='contained' onClick={onClick}>Aggiungi ai preferiti</Button>
)
