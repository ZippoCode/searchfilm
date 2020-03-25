import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Proptypes from 'prop-types';

// Importing Actions
import { AuthenticationActions } from '../redux/actions/authentication.action';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../redux/constants/user.constants';

// Importing from Material-UI
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';

// Importing history
import { history } from '../helpers/history';

// Importing Material-UI's icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

function ButtonPreferite({ idMovie, ...rest }) {

    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token) || undefined;
    const favorite = useSelector(state => state.authentication.favorite) || []
    const isFavorite = favorite.some(elem => elem.id === idMovie)

    const handleAdd = () => {
        if (token) {
            setMessage('Aggiunto')
            dispatch(AuthenticationActions.setMoviePreferite(token, idMovie, ADD_FAVORITE));
            setOpen(true);
        } else {
            history.push('/login', { from: location.pathname });
        }
    }

    const handleRemove = () => {
        setMessage('Rimosso')
        dispatch(AuthenticationActions.setMoviePreferite(token, idMovie, REMOVE_FAVORITE));
        setOpen(true);
    }

    return (
        <div>
            {isFavorite ?
                <Button
                    type='submit'
                    onClick={handleRemove}
                    startIcon={<DeleteIcon />}
                    color='primary'
                    {...rest}
                >
                    Rimuovi dai preferiti
                </Button> :
                <Button
                    type='submit'
                    onClick={handleAdd}
                    startIcon={<FavoriteIcon />}
                    color='primary'
                    {...rest}
                >
                    Aggiungi ai preferiti
                </Button>
            }
            <SnackBar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={open}
                autoHideDuration={1000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </div >
    )
}

ButtonPreferite.propTypes = {
    idMovie: Proptypes.number.isRequired,
}

export default ButtonPreferite;