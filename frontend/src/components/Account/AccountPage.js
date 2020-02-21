import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Import actions
import { requestInfoAccount } from '../../actions/user.action';

// Importing from Material-UI
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';


// Importing custom Tab
import {
    MainTab,
    StatisticsTab,
    EditTab
} from './Tab';

export function AccountPage() {

    const [valueTab, setValueTab] = useState(0);

    const dispatch = useDispatch();
    const logged = useSelector(state => state.authentication.logged) || false
    const token = useSelector(state => state.authentication.token) || '';
    const userLoaded = useSelector(state => state.user.userLoaded)
    const user = useSelector(state => state.user) || '';

    useEffect(() => {
        const fetchUser = () => { dispatch(requestInfoAccount(token)); }
        if (logged && !userLoaded)
            fetchUser();
    }, [dispatch, logged, token, userLoaded]);

    return (
        <div>
            {userLoaded && (
                <div>
                    <h2>Account Page</h2>
                    <Tabs
                        value={valueTab}
                        onChange={(event, newEvent) => setValueTab(newEvent)}
                    >
                        <Tab label='Dettagli account' component={Link} to='/account-page/details' {...mapTabProps(0)} />
                        <Tab label='Statistiche' component={Link} to='/account-page/statistic' {...mapTabProps(1)} />
                        <Tab label='Modifica Account' component={Link} to='/account-page/edit' {...mapTabProps(2)} />
                    </Tabs>
                    <TabPanel value={valueTab} index={0}>
                        <MainTab user={user} />
                    </TabPanel>
                    <TabPanel value={valueTab} index={1}>
                        <StatisticsTab favorites={user.favorite} voted={user.voted} />
                    </TabPanel>
                    <TabPanel value={valueTab} index={2}>
                        <EditTab />
                    </TabPanel>
                </div>
            )}
        </div>
    )
}

function mapTabProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tab-${index}`
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component='div'
            role='tabpanel'
            hidden={value !== index}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Typography>
    )
}