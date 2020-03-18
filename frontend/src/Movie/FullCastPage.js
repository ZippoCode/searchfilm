import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Importing Actions
import { MovieActions } from '../redux/actions/movie.action';

import ListPeople from './components/ListPeople';

// Importing component from Material-UI
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        margin: theme.spacing(3, 8),
    }
});

function FullCastPage(props) {

    const { classes } = props;
    let { id } = useParams();
    const actors = useSelector(state => state.movie.movie.actors) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        if (actors.length === 0)
            dispatch(MovieActions.loadMovie(id));
    }, [dispatch, id, actors.length]);

    return (
        <div className={classes.root}>
            <Typography variant='h3' component='h3'>Cast completo</Typography>
            <ListPeople list={actors} />
        </div>
    )
}

export default withStyles(styles)(FullCastPage);