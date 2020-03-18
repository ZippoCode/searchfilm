import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Style Material-UI
import { withStyles, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        '& .MuiInputBase-root': {
            color: theme.palette.secondary.main,
            fontSize: 21,
        },
    },
    item: {
        color: theme.palette.primary.main,
        fontSize: 19,
    }
});

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
        "& $notchedOutline": {
            borderColor: theme.palette.primary.main,
        },
        "&:hover $notchedOutline": {
            borderColor: theme.palette.primary.dark,
        },
        "&$focused $notchedOutline": {
            borderColor: theme.palette.primary.main,
        }
    },
    focused: {},
    notchedOutline: {}
}))

function SelectCustom(props) {
    const { classes, title, items, ...rest } = props;
    const outlinedClasses = useOutlinedInputStyles();

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => { setLabelWidth(inputLabel.current.offsetWidth); }, []);

    return (
        <FormControl
            fullWidth
            variant='outlined'
            margin='normal'
            className={classes.root}
        >
            <InputLabel
                id={`mood-label-${title}`}
                ref={inputLabel}
                className={classes.label}
            >
                {title}
            </InputLabel>
            <Select
                labelId={`mood-label-${title}`}
                input={<OutlinedInput labelWidth={labelWidth} classes={outlinedClasses} />}
                {...rest}
            >
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        value={item}
                        className={classes.item}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

Select.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
}

export default withStyles(styles)(SelectCustom);