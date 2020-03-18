import React from 'react';

// Importing Components from Material-UI
import { makeStyles } from '@material-ui/core';

//Import for select date GUI
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyled = makeStyles(theme => ({
    root: {
        '& .MuiInputBase-root': {
            //backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            padding: theme.spacing(0),
            fontWeight: 'bold',
        },
        '& .MuiOutlinedInput-input': {

        }
    },
}));

function DateSelect(props) {
    const classes = useStyled();
    const { firstYear, lastYear, handleFirstYear, handleLastYear } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                disableFuture
                name='first_year'
                views={["year"]}
                variant="inline"
                inputVariant="outlined"
                label="Inizio"
                value={firstYear}
                className={classes.root}
                onChange={handleFirstYear}
            />
            <DatePicker
                disableFuture
                name='last_year'
                variant="inline"
                inputVariant="outlined"
                views={["year"]}
                label="Fine"
                minDate={firstYear}
                value={lastYear}
                className={classes.root}
                onChange={handleLastYear}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DateSelect;