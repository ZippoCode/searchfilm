import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

// Importing custom UI-Element
import { ButtonPreferite } from '../components';
import DetailMovie from './components/DetailMovie';
import DialogViewTag from './components/DialogViewTag'
import SelectCustom from '../components/Select';

// Importing Actions
import { MovieActions } from '../redux/actions/movie.action';
import { AuthenticationActions } from '../redux/actions/authentication.action';

// Importing custom function
import { history } from '../helpers/history';

// Importing style from Material-UI
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircleProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import SnackBar from '@material-ui/core/Snackbar';

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: "left",
        color: theme.palette.secondary.main,
        alignItems: 'center',
        margin: theme.spacing(8, 16),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(4, 2),
        }
    },
    posterMovie: {
        maxHeight: theme.spacing(68),
        maxWidth: theme.spacing(57),
        [theme.breakpoints.down('xs')]: {
            height: `calc(100% - 64px)`,
            width: `calc(100% - 64px)`,
        }
    },
    vote: {
        padding: theme.spacing(1),
    }
});


function MoviePage(props) {
    const { classes } = props;
    const voteValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [open, setOpen] = useState(false);

    let { id } = useParams();
    const location = useLocation();

    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token) || undefined;
    const voted = useSelector(state => state.authentication.voted) || [];
    const { value_vote } = voted.find(function (elem) { return elem.movie === parseInt(id) }) || { value_vote: '' }
    const [value, setValue] = useState(value_vote);
    let isLoaded = useSelector(state => state.movie.loaded) || false;
    let movie = useSelector(state => state.movie['movie']) || undefined;

    useEffect(() => {
        dispatch(MovieActions.loadMovie(id));
        setValue(value_vote);
    }, [dispatch, id, value_vote]);


    const handleClick = () => {
        if (token) {
            dispatch(AuthenticationActions.voteMovie(token, id, value));
            setOpen(true);
        } else {
            history.push('/login', { from: location.pathname });
        }
    }

    return (
        <div className={classes.root}>
            {isLoaded ?
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Grid container justify='flex-start' direction='column' alignItems='center' spacing={3}>
                            <img
                                alt='poster-movie'
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                className={classes.posterMovie}
                            />
                            <Grid item>
                                <Grid container justify='center'>
                                    <ButtonPreferite
                                        idMovie={movie.id}
                                        variant='contained'
                                        size='large'
                                    />
                                    <Grid container justify='space-evenly' alignItems='center'>
                                        <SelectCustom items={voteValues} value={value} onChange={e => setValue(e.target.value)} />
                                        <Button fullWidth variant='contained' onClick={handleClick} color='primary'>Vota</Button>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <DialogViewTag movie={movie} />
                                <Divider />
                                <p>Collegamenti esterni</p>
                                <Avatar
                                    alt='IMDB-ID'
                                    variant='square'
                                    src='https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/171_Imdb-512.png'
                                />
                                <Link href={`https://www.imdb.com/title/${movie.imdb_id}/`} target='_blank' color='inherit'>IMDb</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <DetailMovie movie={movie} />
                    </Grid>
                    <SnackBar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={open}
                        autoHideDuration={1000}
                        onClose={() => setOpen(false)}
                        message='Voto Aggiunto'
                    />
                </Grid>
                : (
                    <Grid container justify='center' alignItems='center'>
                        <CircleProgress />
                    </Grid>
                )
            }

        </div>
    )
}

export default withStyles(styles)(MoviePage);