import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Importing Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// Import Icons from Material-UI
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.secondary,
        width: 256,
    },

    genre: {
        paddingBottom: 0,
        paddingTop: 0,
        textAlign: 'center',
    }
}));

const MenuItemLink = ({ path, text, onClick, ...props }) => (
    <ListItem button component={Link} to={path} onClick={onClick} {...props}>
        <ListItemText primary={text} />
    </ListItem>
);


function DrawerMenu(props) {
    const classes = useStyles();

    const { openDrawer, handleOpenDrawer } = props;
    const [openGenres, setOpenGenres] = useState(false);
    const genres = useSelector(state => state.main.genres) || [];

    const handleClick = () => { setOpenGenres(!openGenres); }

    return (
        <SwipeableDrawer
            open={openDrawer}
            onOpen={handleOpenDrawer}
            onClose={handleOpenDrawer}
            swipeAreaWidth={0}
            classes={{ paper: classes.root }}
        >
            <List component='nav'>
                <MenuItemLink path='/' text='Home' onClick={handleOpenDrawer} />
                <Divider />
                <MenuItemLink path='last-movie' text='Ultimi film' onClick={handleOpenDrawer} />
                <MenuItemLink path='/movies/popular' text='I film più popolari' onClick={handleOpenDrawer} />
                <MenuItemLink path='/movies/rated' text='I film più votati' onClick={handleOpenDrawer} />
                <Divider />
                <ListItem button onClick={handleClick}>
                    <ListItemText primary='Generi' />
                    {openGenres ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openGenres} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding >
                        {genres.map((genre, index) =>
                            <MenuItemLink
                                key={index}
                                path={`/movies/genre/${genre.name}`}
                                text={genre.name}
                                onClick={handleOpenDrawer}
                                className={classes.genre}
                            />
                        )}
                    </List>
                </Collapse>
            </List>
        </SwipeableDrawer>
    )
}

export default DrawerMenu;