import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Constants
import * as URL from '../../helpers/matcher';

// Custom Hooks
import useMovieState from '../../Movie/MovieHook';

// Importing from Material-UI
import { withStyles } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        color: theme.palette.secondary.main,
        textAlign: 'start',
        marginTop: theme.spacing(5),
    },
    popper: {
        width: '100%',
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    }
});

const CssTextField = withStyles(theme => ({
    root: {
        '& .MuiInputBase-root': {
            fontSize: 27,
            color: theme.palette.text.primary,
        },
        '& .MuiFormLabel-root': {
            color: theme.palette.text.primary,
            fontSize: 31,
        },
        '& .MuiInput-underline': {
            '&:after': { borderColor: theme.palette.text.primary, },
            '&:before': { borderColor: theme.palette.text.primary, },
            '&:hover:not(.Mui-disabled):before': { borderColor: theme.palette.text.primary.light, },
            '&:hover:not(.Mui-disabled):after': { borderColor: theme.palette.text.primary.light, },
        },
    }
}))(TextField);

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
        }
    }
}))(MenuItem);


function MenuItemCustom(props) {
    const { id, onClick } = props;
    const movie = useMovieState(id);

    return (
        <>
            {movie ? (
                <StyledMenuItem
                    component={Link}
                    href={`/movie/${movie.id}`}
                    onClick={onClick}
                    underline='none'
                >
                    <Grid container direction='column'>
                        <Typography variant='subtitle1' component='p'>{movie.title}</Typography>
                        <Typography variant='subtitle2' component='p'>
                            {(new Date(movie.release_date)).getFullYear()}
                        </Typography>
                    </Grid>
                </StyledMenuItem>
            ) : <></>
            }
        </>
    )
}

function SearchBarMovie(props) {
    const { classes } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [query, setQuery] = useState('');
    const [suggestedMovies, setSuggestedMovies] = useState([]);

    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleClose = () => { setAnchorEl(null); }

    useEffect(() => {
        const getMovies = () => {
            axios.get(URL.SEARCHMOVIEBYTITLE.concat(query))
                .then(response => setSuggestedMovies(response.data.slice(0, 6)))
                .catch(error => console.log(error));
        }
        if (query && query.length > 1 && query.length % 2 === 0)
            getMovies();
    }, [query]);

    return (
        <Container className={classes.root}>
            <CssTextField
                fullWidth
                label='Ricerca per titolo, autore ...'
                id='search-movie-by-title'
                type='text'
                onClick={handleClick}
                onChange={event => setQuery(event.target.value)}
            />
            <Popper
                id='search-movie-bar'
                open={open}
                anchorEl={anchorEl}
                placement='bottom'
                modifiers={{
                    flip: { enabled: false },
                    preventOverflow: { escapeWithReference: true },
                }}
                className={classes.popper}
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            id="menu-suggested"
                        >
                            {suggestedMovies.map((movie, index) => (
                                <MenuItemCustom key={index} id={movie.id} onCLick={handleClick} />
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </Container >
    )
}

export default withStyles(styles)(SearchBarMovie);