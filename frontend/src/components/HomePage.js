import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { recommendedMovie } from '../redux/actions/movie.action';
import { movieAction, getGenres } from '../redux/actions/main.action';

import {
    //CarouselMovie,
    SearchMovieBar,
    SelectCustom
} from './index';

// Style Material-UI
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
//import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

// Import for select date GUI
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
//import DateFnsUtils from '@date-io/date-fns';

//Import for Styled-Components
import styled from 'styled-components';

const ButtonStyled = styled(Button)`
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 32px;
`;

export function HomePage() {

    const userMood = ['Positivo', 'Negativo', 'Neutro']
    const [watched, setWatched] = useState(false);
    const [premiated, setPremiated] = useState(false);
    const [checkDate, setCheckDate] = useState(false);
    const [valueGenre, setValueGenre] = useState('');
    const [valueMoodUser, setValueMoodUser] = useState('');
    const handleChangeGenre = event => { setValueGenre(event.target.value); }
    const handleMoodUser = event => { setValueMoodUser(event.target.value); }

    //const [selectedFirstDate, handleFirstDateChange] = useState(new Date(1900));
    //const [selectedEndDate, handleEndDateChange] = useState(new Date());


    const dispatch = useDispatch();
    //let popularMovies = useSelector(state => state.main.popularMovies) || [];
    let genresArray = useSelector(state => state.main.genres) || [];
    let genres = genresArray.map((genre) => { return genre.name });
    let loadedPopular = useSelector(state => state.main.loadedPopular) || false;
    let loadedGenres = useSelector(state => state.main.loadedGenres) || false;

    const getRecommendedMovie = useCallback(
        () => dispatch(recommendedMovie()), [dispatch]
    );

    useEffect(() => {
        const loadPopularMovies = () => { dispatch(movieAction.getListMovies('popular')); }
        if (!loadedPopular)
            loadPopularMovies();

    }, [dispatch, loadedPopular]);


    useEffect(() => {
        const loadGenres = () => { dispatch(getGenres()); }
        if (!loadedGenres)
            loadGenres();
    }, [dispatch, loadedGenres]);

    return (
        <div >
            <Grid container>
                <h1>Ricerca un film</h1>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={6} md={4}>
                    <Grid container direction='column'>
                        <h3>Settaggio principale</h3>
                        <SelectCustom title={'Umore'} list={userMood} value={valueMoodUser} handleChange={handleMoodUser} />
                        <SelectCustom title={'Genere'} list={genres} value={valueGenre} handleChange={handleChangeGenre} />
                    </Grid>
                </Grid>
                <Grid item xs={6} md={4}>
                    <h3>Altre informazioni</h3>
                    <FormGroup row>
                        <FormControlLabel
                            label='Già visto'
                            control={
                                <Checkbox
                                    checked={watched}
                                    onChange={(event) => setWatched(event.target.checked)}
                                />}
                        />
                        <FormControlLabel
                            label='Premiato'
                            control={
                                <Checkbox
                                    checked={premiated}
                                    onChange={(event) => setPremiated(event.target.checked)}
                                />}
                        />
                        <FormControlLabel
                            label='Anno?'
                            control={
                                <Switch
                                    checked={checkDate}
                                    onChange={(event) => setCheckDate(event.target.checked)}
                                />}
                        />
                        {/*
                        <Collapse in={checkDate}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableFuture
                                    views={["year"]}
                                    label="Inizio"
                                    value={selectedFirstDate}
                                    onChange={handleFirstDateChange}
                                />
                                <KeyboardDatePicker
                                    disableFuture
                                    views={["year"]}
                                    label="Fine"
                                    value={selectedEndDate}
                                    onChange={handleEndDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Collapse>
                            */}
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ButtonStyled
                        onClick={getRecommendedMovie}
                        variant='contained'
                    >
                        Ricerca Movie
                     </ButtonStyled>
                </Grid>
            </Grid>
            <Grid item xs>
                <h3>Ricerca movie</h3>
                <SearchMovieBar />
            </Grid>
            <Grid item xs={12}>
                <h3>I titoli del momento</h3>
                <h5>Visualizzali tutti.</h5>
                {/*<CarouselMovie movies={popularMovies} />*/}
            </Grid>
        </div>
    );
}