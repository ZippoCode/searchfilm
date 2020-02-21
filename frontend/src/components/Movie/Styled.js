import styled from 'styled-components';

// Material-UI importing
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import { FixedSizeList } from 'react-window';
//import { Select } from '@material-ui/core';

export const StyledTitle = styled(Typography)`
    font-size: 60px;
    text-align: start;
    letter-spacing: -2px;
    margin:'30px 0 25px';
    text-transform:none;
`;

export const StyledMovieDetails = styled.div`
    display: flex;
    flex-grow: 1;
    background-color: #1F2120;
    padding: 32px 4%;
    color: white;
`;

export const StyledListItemText = styled(ListItemText)`
.MuiTypography-body1{
    color: white;
}
.MuiTypography-body2{
    color: gray;
}
`;

export const Description = styled(Typography)`
    margin-top: 60px;
    line-height: 25px;
    font-size: 14px;
    text-rendering:optimizeLegibility;
`;

export const StyledFixedSizeList = styled(FixedSizeList)`
::-webkit-scrollbar {
	width: 16px;
	background-color: #1F2120;
}

::-webkit-scrollbar-track {
	border-radius: 16px;
	background-color: white;
}

::-webkit-scrollbar-thumb {
    width: 16px;
	border-radius: 32px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: black;
}`;

export const Main = styled(Grid)`
    padding: 8px 4%;
`

export const PosterMovie = styled.img`
    height: 502px;
    width: 357px;
    border-radius: 8px;
`

export const Content = styled(Grid)`
    padding: 16px 4%;
`

export const SelectVote = styled.select`
`