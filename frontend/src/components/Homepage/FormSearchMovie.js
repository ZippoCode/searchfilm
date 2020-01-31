import React, { useState, useEffect } from 'react';

// Style 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import { InputLabel, FormControl, Collapse } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: 'auto',
        elevation: 3,
    },
    genresChoice: {
        minWidth: '98%',
    },
    headerPaper: {
        padding: theme.spacing(2),
        width: '100%',
        background: '#DDDDDD',
        color: '#000000',
        alignItems: 'flex-start',
        borderRadius: 8,
    },
    contentPaper: {
        padding: theme.spacing(2),
    }
}));

export function FormSearchMovie() {
    const classes = useStyles();

    const [genres, setGenres] = useState(['Scegli un genere']);
    const [genre, setGenre] = useState('');
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [checkRange, setCheckRange] = useState(false);
    useEffect(() => { setLabelWidth(inputLabel.current.offsetWidth + 8); }, [])
    const [selectedFirstDate, handleFirstDateChange] = useState(new Date());
    const [selectedEndDate, handleEndDateChange] = useState(new Date());

    const marksSlider = [
        { value: 0, label: '0' },
        { value: 10, label: '10' }
    ];

    const handleChange = event => {
        setGenre(event.target.value);
    }

    const SliderEmotions = withStyles(theme => ({
        root: {
            color: theme.palette.primary.main,
            height: 8,
        },
        thumb: {
            height: 24,
            width: 24,
            backgroundColor: theme.palette.primary.main,
            border: '2px solid currentColor',
            marginTop: -8,
            marginLeft: -12,
            '&:focus,&:hover,&$active': {
                boxShadow: 'inherit',
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)',
        },
        track: {
            height: 8,
            borderRadius: 4,
        },
        rail: {
            height: 8,
            borderRadius: 4,
        },
    }))(Slider);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`http://127.0.0.1:8000/movie/api/genres`)
                .then(response => response.json())
                .then(data => { return data })
                .catch(err => { return err });
            setGenres(result);
        };
        fetchData();
    }, []);


    return (
        <div>
            <Grid container spacing={2} justify='space-around'>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Grid container justify='center'>
                            <Grid item className={classes.headerPaper}>
                                <Typography component='header' variant='h4' gutterBottom>Come ti senti?</Typography>
                                <Typography component='header' variant='h5' gutterBottom>Descrivi le tue emozioni</Typography>
                            </Grid>
                            <Grid container item className={classes.contentPaper}>
                                <Typography variant='h6' gutterBottom>Felicità</Typography>
                                <SliderEmotions
                                    marks={marksSlider}
                                    valueLabelDisplay='auto'
                                    defaultValue={5}
                                    min={0}
                                    max={10}
                                />
                                <Typography variant='h6' gutterBottom>Amore</Typography>
                                <SliderEmotions
                                    marks={marksSlider}
                                    valueLabelDisplay='auto'
                                    defaultValue={5}
                                    min={0}
                                    max={10}
                                />
                                <Typography variant='h6'>Solitudine</Typography>
                                <SliderEmotions
                                    marks={marksSlider}
                                    valueLabelDisplay='auto'
                                    defaultValue={5}
                                    min={0}
                                    max={10}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Grid container justify='center'>
                            <Grid item className={classes.headerPaper}>
                                <Typography component='header' variant='h4' gutterBottom>Cosa vorresti vedere?</Typography>
                                <Typography component='header' variant='h5' gutterBottom>Definisci il film</Typography>
                            </Grid>
                            <Grid container className={classes.contentPaper}>
                                <Grid item xs={12}>
                                    <FormControl className={classes.genresChoice} variant='outlined'>
                                        <InputLabel id='genres-choice' ref={inputLabel}>Scegli un genere</InputLabel>
                                        <Select
                                            labelId='genres-choice'
                                            id='genres-choice'
                                            value={genre}
                                            onChange={handleChange}
                                            labelWidth={labelWidth}
                                        >
                                            {genres.map((genre, index) => (
                                                <MenuItem key={index} value={genre.name}>{genre.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid container item justify='space-evenly' direction='column' alignItems='stretch'>
                                    <FormControlLabel
                                        onClick={(event) => { setCheckRange(event.target.checked) }}
                                        label="Anno rilascio?"
                                        control={<Switch color='primary' />}
                                    />
                                    <Collapse in={checkRange}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid item container justify='space-evenly' direction='row' alignItems='stretch'>

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
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </Collapse>
                                    <FormControlLabel
                                        label='Già visto?'
                                        control={<Switch color='primary' />}
                                    />
                                    <FormControlLabel
                                        label="Premiato?"
                                        control={<Switch color='primary' />}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Fab size='large' variant='extended' color='primary'>Ricerca</Fab>
                </Grid>
            </Grid>
        </div>
    )
}
