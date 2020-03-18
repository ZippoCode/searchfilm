import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Importing Custom Function
import CheckMovie from './CheckButton';
//import DateSelect from './DateSelect';
import MainButton from '../../components/MainButton';
import SelectCustom from '../../components/Select';

// Importing Components from Material-UI
import { withStyles } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
//import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

// Importing Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        alignItems: 'center',
        marginTop: theme.spacing(6),
    },
    button: {
        padding: theme.spacing(2),
    },
});


function MainForm(props) {
    const { classes } = props;
    const userMood = ['Casuale', 'Felice', 'Triste', 'Coraggioso', 'Innamorato'];
    //const [checkDate, setCheckDate] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const genresArray = useSelector(state => state.main.genres) || [];
    const genres = genresArray.map((genre) => { return genre.name });
    //const [firstYear, handleFirstYear] = useState(new Date('1900'));
    //const [lastYear, handleLastYear] = useState(new Date('2020'));
    const [options, setOptions] = useState({
        mood: '',
        genre: '',
        premiated: false,
        watched: false,
    });

    const updateSelectValue = (event) => {
        setOptions({ ...options, [event.target.name]: event.target.value });
    };

    const updateCheckValue = (event) => {
        setOptions({ ...options, [event.target.name]: event.target.checked })
    };

    return (
        <Grid container className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <SelectCustom
                        title={'Umore'}
                        items={userMood}
                        name='mood'
                        value={options.mood}
                        onChange={updateSelectValue}
                    />
                </Grid>
                <Grid item xs={12} md={6} className={classes.button}>
                    <MainButton choices={options} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems='center'>
                    <Typography>Altre informazioni</Typography>
                    <IconButton
                        onClick={() => setExpanded(!expanded)}
                        color='inherit'
                        position='end'
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
                <Collapse in={expanded} timeout='auto' mountOnEnter unmountOnExit>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SelectCustom
                                title={'Genere'}
                                items={genres}
                                name='genre'
                                value={options.genre}
                                onChange={updateSelectValue} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormGroup row>
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <CheckMovie
                                            label='Già visto'
                                            name='watched'
                                            checked={options.watched}
                                            onChange={updateCheckValue}
                                        />
                                        <CheckMovie
                                            label='Premiato'
                                            name='premiated'
                                            checked={options.premiated}
                                            onChange={updateCheckValue}
                                        />
                                    </Grid>
                                    {/*
                                    <Grid container>
                                        <FormControlLabel
                                            label='Anno?'
                                            control={
                                                <Switch
                                                    className={classes.checkroot}
                                                    checked={checkDate}
                                                    color='primary'
                                                    onChange={(event) => setCheckDate(event.target.checked)}
                                                />}
                                        />
                                        <Collapse in={checkDate} unmountOnExit>
                                            <DateSelect
                                                firstYear={firstYear}
                                                lastYear={lastYear}
                                                handleFirstYear={handleFirstYear}
                                                handleLastYear={handleLastYear}
                                            />
                                        </Collapse>
                                    </Grid>*/
                                    }

                                </Grid>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Grid >
    )
}

export default withStyles(styles)(MainForm);