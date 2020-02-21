import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

// Importing from React-Redux
import { useSelector, useDispatch } from 'react-redux';

// Importing Styled-Components
import styled from 'styled-components';


// importing from Material-UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';


// dispatch actions
import {
    logout
} from '../actions';

// Const Styled
const TitleAppBar = styled.h3`
    flex-grow: 1;
`

const DrawerMenuStyled = styled.div`
    width: 256px;
    padding-left: 4%;
`;


const MenuItemLink = ({ path, valueText }) => (
    <ListItem button component={Link} to={path}>
        {valueText}
    </ListItem>
);


export function AppBarCustom() {
    const [openDrawer, setOpenDrawer] = useState(false);

    let logged = useSelector(state => state.authentication.logged) || false;
    const handleOpenDrawer = () => (setOpenDrawer(openDrawer => !openDrawer));

    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Button edge='start' onClick={handleOpenDrawer}>Menu</Button>
                <SwipeableDrawer
                    open={openDrawer}
                    onClick={handleOpenDrawer}
                    onOpen={handleOpenDrawer}
                    onClose={handleOpenDrawer}
                >
                    <ClickAwayListener onClickAway={handleOpenDrawer}>
                        <DrawerMenuStyled>
                            <List>
                                <MenuItemLink path='/' valueText='Home' />
                                <MenuItemLink path='last-movie' valueText='Ultimi film' />
                                <MenuItemLink path='/movies/popular' valueText='I film più popolari' />
                                <MenuItemLink path='/movies/rated' valueText='I film più votati' />
                            </List>
                        </DrawerMenuStyled>
                    </ClickAwayListener>
                </SwipeableDrawer>
                <TitleAppBar>Search Movie</TitleAppBar>
                {logged ? (<Logout />) : (<Login />)}
            </Toolbar>
        </AppBar>
    )
}

function Login() {
    return (
        <Button component={Link} to='/login' color='inherit' type='submit'>Login</Button>
    )
}

function Logout() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token);

    const handleSubmit = useCallback(
        () => dispatch(logout(token)), [dispatch, token]
    );

    const handleClose = () => { setOpen(open => !open); };

    return (
        <div>
            <Button
                ref={anchorRef}
                onClick={() => setOpen(open => !open)}
            >
                Account
            </Button>
            <Popper open={open} anchorEl={anchorRef.current}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper>
                        <MenuList>
                            <MenuItem component={Link} to='/account-page' onClick={handleClose}>Profilo</MenuItem>
                            <MenuItem onClick={handleClose}>Statistiche</MenuItem>
                            <MenuItem onClick={handleSubmit}>Logout</MenuItem>
                        </MenuList>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </div>
    )
}