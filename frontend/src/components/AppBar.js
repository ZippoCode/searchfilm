import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { movieAction } from '../_actions/movie.action';
import { userActions } from '../_actions/user.action';

// Style
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Drawer, List, ListItem, ListItemText, Divider, CssBaseline, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Icon
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        background: '#1F2120'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
}));

export function AppBarCustom() {
    const { user } = useSelector(state => state.authentication);
    const dispatch = useDispatch();


    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const { token } = useSelector(state => state.authentication.user) || 'null';
    const handleLogout = () => {
        dispatch(userActions.logout(token));
    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        onClick={handleDrawerOpen}
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        SearchMovie
                    </Typography>
                    {user ?
                        (<div>
                            <IconButton
                                aria-label='account of current user'
                                aria-controls='menu-appbar-account'
                                aria-haspopup='true'
                                onClick={handleMenu}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                keepMounted
                                id='menu-appbar-account'
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={openMenu}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} component={Link} to='/account-details'>Dettagli Account</MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout} >Logout</MenuItem>
                            </Menu>
                        </div>)
                        :
                        (<Button href='/login' color="inherit">Login</Button>)
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                anchor='left'
                variant='persistent'
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onClick={handleDrawerClose}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <List>
                    <ListItem button component={Link} to='/'>
                        <ListItemText primary='Home' />
                    </ListItem>
                    < Divider />
                    <ListItem button onClick={() => dispatch(movieAction.viewTopPopular())}>
                        <ListItemText primary='I film più popolari' />
                    </ListItem>
                    <ListItem button onClick={() => dispatch(movieAction.viewTopRanked())}>
                        <ListItemText primary='I film più votati' />
                    </ListItem>
                </List >
            </Drawer>
        </div>
    );
}
