import React, { useState, useEffect } from 'react';

// Style 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: 'auto',
        elevation: 3,
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

    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState('');
    const marksSlider = [
        { value: 0, label: '0' },
        { value: 10, label: '10' }
    ];
    const [valueRangeYears, setValueRangeYears] = useState([0, 100])
    const [checkRange, setCheckRange] = useState(true);

    const handleChange = event => {
        setGenre(event.target.value);
    }

    const handleChangeRangeYears = (event, newEvent) => {
        setValueRangeYears(newEvent);
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
            <Grid container spacing={3}>
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
                                <Select
                                    autoWidth
                                    labelId='genres-choices-label'
                                    id='genres-of-movie'
                                    value={genre}
                                    onChange={handleChange}
                                >
                                    {genres.map((genre) => (
                                        <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormControlLabel
                                    onClick={(event) => { console.log(event); setCheckRange(!event.target.checked) }}
                                    label="Anno rilascio?"
                                    labelPlacement='start'
                                    control={<Switch color='primary' />}
                                />
                                <Typography>Range anno</Typography>
                                <Slider
                                    disabled={checkRange}
                                    aria-labelledby="range-slider"
                                    value={valueRangeYears}
                                    marks={[{ value: 0, label: '1910' }, { value: 90, label: '2020' }]}
                                    onChange={handleChangeRangeYears}
                                />
                                <List>
                                    <ListItem>
                                        <ListItemText id='watched-movie' primary='Già visto' />
                                        <ListItemSecondaryAction>
                                            <Switch
                                                edge='end'
                                                color='primary'
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText id='premiated-movie' primary='Premiato' />
                                        <ListItemSecondaryAction>
                                            <Switch
                                                edge='end'
                                                color='primary'
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item>
                <Button fullWidth variant='contained' color='primary'>Ricerca</Button>
            </Grid>
        </div>
    )
}
