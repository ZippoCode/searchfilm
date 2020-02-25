import React, { useEffect, useState, useRef } from 'react';

// Style Material-UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';

const SelectStyled = styled(Select)`
    background-color: ${props => props.theme.color.component};
    color: ${props => props.theme.color.textcomponent};
`

export function SelectCustom(props) {
    const { title, list, value, handleChange } = props;
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => { setLabelWidth(inputLabel.current.offsetWidth); }, []);

    return (
        <FormControl variant='outlined' margin='normal'>
            <InputLabel id={`mood-label-${title}`} ref={inputLabel}>{title}</InputLabel>
            <SelectStyled
                labelId={`mood-label-${title}`}
                labelWidth={labelWidth}
                value={value}
                onChange={handleChange}
            >
                {list.map((value, index) => (
                    <MenuItem key={index} value={value}>{value}</MenuItem>
                ))}
            </SelectStyled>
        </FormControl>
    )
}