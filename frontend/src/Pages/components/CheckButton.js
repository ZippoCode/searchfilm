import React from 'react';

// Importing from Material-UI
import { withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({})


function CheckMovie(props) {
    const { label, classes, ...rest } = props || { label: '' };

    return (
        <FormControlLabel
            label={label}
            control={
                <Checkbox
                    className={classes.checkroot}
                    color='primary'
                    {...rest}
                />}
        />
    )
}

export default withStyles(styles)(CheckMovie);