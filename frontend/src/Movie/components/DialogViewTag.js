import React from 'react';
import { useDispatch } from 'react-redux';



// Importing custom elements
import ChipTag from './ChipTag';

// Importing from Material UI
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { MovieActions } from '../../redux/actions/movie.action';


const styles = theme => ({
    content: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
});

function DialogViewTag(props) {
    const { movie, classes } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(MovieActions.loadMovie(movie.id));
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                style={{ margin: '16px', alignItems: 'center' }}>
                Visualizza i tag
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Parole chiavi: ".concat(movie.title)}</DialogTitle>
                <DialogContent className={classes.content}>
                    {movie.keywords.map((tag) => (
                        <ChipTag
                            tag={tag}
                            id={movie.id}
                            key={tag.id}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant='contained' autoFocus>
                        Salva
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(DialogViewTag);