import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Importing Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// Import Icons from Material-UI
import HomeIcon from '@material-ui/icons/Home';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

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
    <ListItem button component={Link} href={path} onClick={onClick} {...props}>
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
            <List component='nav' >
                <ListItem button component={Link} href='/' undeline='none' onClick={handleOpenDrawer}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
                <Divider />
                <ListItem button component={Link} href='/movies/last-movie' undeline='none' onClick={handleOpenDrawer}>
                    <ListItemIcon><ScheduleIcon /></ListItemIcon>
                    <ListItemText primary={'Film recenti'} />
                </ListItem>
                <ListItem button component={Link} href='/movies/popular' undeline='none' onClick={handleOpenDrawer}>
                    <ListItemIcon><StarIcon /></ListItemIcon>
                    <ListItemText primary={'Film più popolari'} />
                </ListItem>
                <ListItem button component={Link} href='/movies/rated' undeline='none' onClick={handleOpenDrawer}>
                    <ListItemIcon><ThumbUpIcon /></ListItemIcon>
                    <ListItemText primary={'Film più votati'} />
                </ListItem>
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