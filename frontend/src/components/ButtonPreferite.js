import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../_actions/user.action';
import { history } from '../_helpers/history';

import Button from '@material-ui/core/Button';

export function ButtonPreferite(props) {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const title = props.title;
    const id = props.id;

    let button;

    const handleAdd = () => {
        if (!user) {
            return history.push('/login');
        }
        return dispatch(userActions.add_to_favorites(user, id));
    }

    const handleRemove = () => {
        return dispatch(userActions.remove_to_favorites(user, id))
    }

    if (user) {
        const favorites = user.favorites;
        const isFavorite = favorites.some(elem => elem.title === title);
        if (isFavorite) {
            button = <ButtonRemoveFavorite onClick={handleRemove} />
        } else {
            button = <ButtonAddFavorite onClick={handleAdd} />
        }
    } else {
        button = <ButtonAddFavorite onClick={handleAdd} />
    }

    return <div>{button}</div>;
}


function ButtonAddFavorite(props) {
    return <Button onClick={props.onClick}>Aggiungi ai preferiti</Button>
}

function ButtonRemoveFavorite(props) {
    return <Button onClick={props.onClick}>Rimuovi dai preferiti</Button>
}