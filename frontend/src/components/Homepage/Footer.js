import React from 'react';

import './Footer.css';
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import styled from 'styled-components';


const theme = createMuiTheme();
theme.typography.h2 = {
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '24px',
};
theme.typography.subtitle2 = {
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '15px',
}

const useStyles = makeStyles(theme => ({
    info: {
        display: 'flex',
        marginTop: '24px',
        justifyContent: 'space-between',
    }
}));

const StyledFooter = styled.div`
    clear: both;
    padding-top: 40px;
    padding-bottom: 26px;
    background-color: #ffffff;
`;

export function FooterHomePage() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <StyledFooter>
                <Grid container className={'container-footer'}>
                    <Grid item lg={4}>
                        <Typography paragraph component='h2' variant='h2'>Search Movie</Typography>
                    </Grid>
                    <Grid item lg={6} md={8} sm={7}>
                        <Grid container justify='space-evenly'>
                            <Grid item>
                                <Typography component='h5' variant='h5' paragraph>Contatti</Typography>
                                <Typography component='p' variant='subtitle2' paragraph>Manifesto</Typography>
                                <Typography component='p' variant='subtitle2' paragraph >Chi siamo</Typography>
                                <Typography component='p' variant='subtitle2' paragraph>Scrivici</Typography>
                            </Grid>
                            <Grid item>
                                <Typography component='h5' variant='h5' paragraph>Informazioni</Typography>
                                <Typography component='p' variant='subtitle2' paragraph>Come funziona</Typography>
                                <Typography component='p' variant='subtitle2' paragraph >API</Typography>
                                <Typography component='p' variant='subtitle2' paragraph>Database</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div className='space'></div>
                <Grid container item alignItems='center' justify='space-between' className={'end'}>
                    <Grid item className={classes.info}>
                        <Typography component='h6' variant='subtitle2' paragraph>2020, SearchMovie</Typography>
                    </Grid>
                    <Grid container item className={classes.info} lg={6} md={7} xl={5} justify='space-evenly'>
                        <Typography component='h6' variant='subtitle2' paragraph>Condizioni d'uso</Typography>
                        <Typography component='h6' variant='subtitle2' paragraph>|</Typography>
                        <Typography component='h6' variant='subtitle2' paragraph>Politica Privacy</Typography>
                        <Typography component='h6' variant='subtitle2' paragraph>|</Typography>
                        <Typography component='h6' variant='subtitle2' paragraph>Credits</Typography>
                    </Grid>
                </Grid>
            </StyledFooter>
        </ThemeProvider>
    )
}
