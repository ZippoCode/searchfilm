import React, { useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Dispatch actions
import { AuthenticationActions } from '../redux/actions/authentication.action';

// Import Custom Element UI
import DrawerMenu from './Drawer';

// importing from Material-UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Login() {
    return (
        <Button
            component={Link}
            href='/login'
            type='submit'
            variant='contained'
            color='secondary'
            underline='none'
        >
            Login
        </Button>
    )
}

function Logout() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token) || undefined;

    const handleSubmit = useCallback(
        () => dispatch(AuthenticationActions.logout(token)), [dispatch, token]
    );

    const handleClose = () => { setOpen(open => !open); };

    return (
        <div>
            <IconButton
                color='inherit'
                edge='end'
                ref={anchorRef}
                onClick={() => setOpen(open => !open)}
            >
                <AccountCircleIcon />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placeholder='bottom'
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                            <MenuItem component={Link} href={'/account'} onClick={handleClose}>Profilo</MenuItem>
                            <MenuItem component={Link} href={`/account/edit`} onClick={handleClose}>Modifica Account</MenuItem>
                            <MenuItem component={Link} href={'/'} onClick={handleSubmit}>Logout</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </div>
    )
}

const styles = theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        color: theme.palette.text.secondary,
        alignItems: 'center',
        flexGrow: 1,
        fontSize: 24,
        '& .MuiSvgIcon-root': { lineHeight: 0 }
    },
});

function AppBarCustom(props) {
    const { classes } = props;
    const [openDrawer, setOpenDrawer] = useState(false);

    let logged = useSelector(state => state.authentication.logged) || false;
    const handleOpenDrawer = () => (setOpenDrawer(openDrawer => !openDrawer));

    return (
        <div>
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        edge='start'
                        onClick={handleOpenDrawer}
                        color='inherit'
                        aria-label='menu'
                    >
                        <MenuIcon />
                    </IconButton>
                    <DrawerMenu
                        openDrawer={openDrawer}
                        handleOpenDrawer={handleOpenDrawer}
                    />
                    <Link
                        className={classes.title}
                        href='/'
                        variant='h6'
                        color='inherit'
                        underline='none'
                    >
                        {'Search Movie'}
                    </Link>
                    {logged ? (<Logout />) : (<Login />)}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}

export default withStyles(styles)(AppBarCustom);