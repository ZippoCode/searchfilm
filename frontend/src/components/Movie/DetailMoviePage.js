import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';

// Importing custom UI-Element
import { ButtonPreferite } from '../../components/ButtonPreferite';

// Importing Actions
import { loadMovie } from '../../redux/actions/movie.action';
import { voteMovie } from '../../redux/actions/user.action';

// Importing custom function
import { SelectCustom } from '../SelectForm';

import { history } from '../../helpers/history';

// Importing style from Material-UI
import Button from '@material-ui/core/Button';
import BreadCrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

// Importing style from Styled-Components
import styled from 'styled-components';

import { ListPeople } from './ListPeople';

const Wrapper = styled.div`
    margin-top: 8%;
    margin-left: 8%;
    margin-right: 8%;
    text-align: left;

    img{
        max-height: 525px;
        max-width: 375px;
    }

    .text-right{
        text-align: right;
        margin: 0px;
    }
`;

function MoviePage() {

    const votes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let { id } = useParams();
    const location = useLocation();

    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token) || undefined;
    const voted = useSelector(state => state.user.voted) || [];
    const { value_vote } = voted.find(function (elem) { return elem.movie === parseInt(id) }) || { value_vote: '' }
    const [value, setValue] = useState(value_vote);

    let isLoaded = useSelector(state => state.movie.loaded) || false;
    let movie = useSelector(state => state.movie['movie']) || undefined;
    let data = movie && new Date(movie.release_date);

    useEffect(() => {
        dispatch(loadMovie(id));
    }, [dispatch, id]);

    const handleClick = useCallback(
        () => {
            token ?
                dispatch(voteMovie(token, id, value))
                :
                history.push('/login', { from: location.pathname });
        }, [dispatch, token, id, value, location.pathname]
    );

    const handleChange = event => { setValue(event.target.value); }

    return (
        <Wrapper>
            {isLoaded && (
                <Grid container component='main' spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify='flex-start' direction='column' alignItems='center' spacing={3}>
                            <Grid item
                                component='img'
                                alt='poster-movie'
                                src={`https://image.tmdb.org/t/p/w500/${movie.tmdb_file_path_poster}`}
                            />
                            <Grid item>
                                <ButtonPreferite idMovie={movie.id} />
                                <Grid container justify='space-between' alignItems='center' >
                                    <SelectCustom list={votes} handleChange={handleChange} value={value} />
                                    <Grid item>
                                        <Button variant='contained' onClick={handleClick}>Vota</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction='column'>
                            <BreadCrumbs aria-label='breadcrumb'>
                                {movie.genres.map(genre => (
                                    <Link to={`/movies/genre/${genre.name}`} key={genre.id}>
                                        <p>
                                            {genre.name}
                                        </p>
                                    </Link>
                                ))}
                            </BreadCrumbs>
                            <h4 className={'text-right'}>{data.getFullYear()}</h4>
                            <h1>{movie.title}</h1>
                            <p>{movie.description}</p>
                            <p>Titolo originale: {movie.original_title}</p>
                        </Grid>
                        <Divider />
                        <Grid container justify='space-around'>
                            <Grid item>
                                <p>Numero voti: {movie.vote_counter}</p>
                            </Grid>
                            <Grid item>
                                <p>Voto medio: {movie.vote_average}</p>
                            </Grid>
                        </Grid>
                        <Divider />
                        <p>Registi</p>
                        <ListPeople list={movie.directors} />
                        <p>Cast</p>
                        <ListPeople list={movie.actors} num={5} />
                        <Link to={{
                            pathname: `${location.pathname}/cast`,
                            state: { cast: movie.actors }
                        }}>
                            <p>Visualizzali tutti</p>
                        </Link>
                    </Grid>
                </Grid >
            )
            }
        </Wrapper >
    )
}

export default MoviePage;