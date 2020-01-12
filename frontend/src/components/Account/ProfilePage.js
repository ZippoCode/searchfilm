import React from 'react';

import { useSelector } from "react-redux";

// Style
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { EditAccountTab } from './Tab/EditAccountTab';
import { StatisticsTab } from './Tab/StatisticsTab';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3),
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    toolbar: theme.mixins.toolbar,
}));

function TabPanelDetailAccount(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function LinkTab(props) {

    return (
        <Tab
            component="a"
            onClick={event => { event.preventDefault(); }}
            {...props}
        />
    )
}
export function ProfilePage() {
    const classes = useStyles();

    const { user } = useSelector(state => state.authentication);
    const { email, first_name, last_name } = user;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <LinkTab label="Dettagli Account" href='/ciao' {...a11yProps(0)} />
                <LinkTab label="Statistiche" href='/ciaooo' {...a11yProps(1)} />
                <LinkTab label="Modifica account" href='cuiiiajbf' {...a11yProps(2)} />
            </Tabs>
            <TabPanelDetailAccount value={value} index={0}>
                <h1>Dettagli Account: </h1>
                <h3>Email: {email}</h3>
                <h3>Name: {first_name}</h3>
                <h3>Cognome: {last_name}</h3>
            </TabPanelDetailAccount>
            <TabPanelDetailAccount value={value} index={1}>
                <StatisticsTab />
            </TabPanelDetailAccount>
            <TabPanelDetailAccount value={value} index={2}>
                <EditAccountTab />
            </TabPanelDetailAccount>
        </div>
    );
}