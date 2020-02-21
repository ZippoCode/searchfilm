import React from 'react';

import { MenuOptionsAccount } from './MenuOptionsAccount'
import { ChangePasswordPage } from './ChangePasswordPage'


// Style
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));


export function EditAccountPage() {
    const classes = useStyles();

    return (
        <div>
            <MenuOptionsAccount />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <ChangePasswordPage />
            </main>
        </div>
    )

}