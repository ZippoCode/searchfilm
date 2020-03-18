import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import axios from 'axios';

// Importing from Material-UI
import { withStyles } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';

import { history } from '../../helpers/history';

const styles = theme => ({
    root: {
        fontSize: 15,
    },
});


function ChipTag(props) {
    const { tag, id, classes } = props;
    const location = useLocation();
    const [clicked, setClicked] = React.useState(false);
    const token = useSelector(state => state.authentication.token) || null;
    const [keyword, setKeyword] = React.useState({
        id: tag.id,
        text: tag.text,
        count: tag.count,
    });

    const handleClick = async (event) => {
        if (!token) {
            history.push('/login', { from: location.pathname });
        }
        try {
            const response = await axios({
                url: `http://127.0.0.1:8000/movie/api/keywords/${id}`,
                method: clicked ? 'DELETE' : 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                data: { 'id': keyword.id, 'text': keyword.text }
            });
            setKeyword(response.data.find(elem => { return elem.id === tag.id }));
        } catch (error) { console.log(error) }
        setClicked(!clicked);
    }

    return (
        <Chip
            label={`${keyword.text}: ${keyword.count}`}
            key={tag.id}
            color={clicked ? 'primary' : 'secondary'}
            onClick={handleClick}
            className={classes.root}
            clickable
        />
    )
}

export default withStyles(styles)(ChipTag);