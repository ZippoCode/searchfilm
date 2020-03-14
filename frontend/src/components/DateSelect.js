import React, { useState } from 'react';

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
    const [selectedFirstDate, handleFirstDateChange] = useState(new Date(1900));
    const [selectedEndDate, handleEndDateChange] = useState(new Date());

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                disableFuture
                views={["year"]}
                variant="inline"
                inputVariant="outlined"
                label="Inizio"
                value={selectedFirstDate}
                onChange={handleFirstDateChange}
                className={classes.root}
            />
            <DatePicker
                disableFuture
                variant="inline"
                inputVariant="outlined"
                views={["year"]}
                label="Fine"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                className={classes.root}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DateSelect;