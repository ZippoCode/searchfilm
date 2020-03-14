import React from 'react';
import { useDispatch } from 'react-redux';

// Importing custom Actions
import { MovieActions } from '../redux/actions/movie.action';

// Importing from Material-UI
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const StyledButton = withStyles(theme => ({
    root: {
        height: theme.spacing(15),
        color: theme.palette.text.secondary,
        border: `4px ${theme.palette.primary.main} solid`,
        fontSize: 32,
        fontWeight: 'bold',
        backgroundImage: `linear-gradient(to left, transparent, transparent 50%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.main} )`,
        backgroundPosition: '100% 0',
        backgroundSize: '200% 100%',
        transition: 'all .25s ease-in',
        '&:hover': {
            backgroundPosition: '0 0',
            color: theme.palette.secondary.main,
        },
    },
}))(Button);


function MainButton(props) {
    const { choices } = props;
    const dispatch = useDispatch();
    const getRecommendedMovie = () => { dispatch(MovieActions.recommendedMovie(choices)) };

    return (
        <StyledButton
            fullWidth
            color='primary'
            size='large'
            onClick={getRecommendedMovie}
        >
            Ricerca Movie
        </StyledButton>
    )
}

export default MainButton;