import React from 'react';

// Importing from Material-UI
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'

// Icons
import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import Instagram from '@material-ui/icons/Instagram';


const useStyles = makeStyles(theme => ({
    footer: {
        flexShrink: 0,
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        textAlign: 'start',
    }
}))

export function FooterCustom() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant='subtitle2' color='textSecondary'>
                <Grid container>
                    <Grid item xs={12} md={7}>
                        <p>Search Movie, 2020 ©</p>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Grid container justify='space-evenly'>
                            <Grid item>
                                <Typography variant='subtitle1'>Canali social</Typography>
                                <Grid container direction='column'>
                                    <Grid container>
                                        <Link
                                            href='https://www.facebook.com'
                                            color='inherit'
                                            target='_blank'
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                                </Link>
                                        <Facebook fontSize='small' />
                                    </Grid>
                                    <Grid container>
                                        <Link
                                            href='https://www.instagram.com'
                                            color='inherit'
                                            target='_blank'
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                                </Link>
                                        <Instagram fontSize='small' />
                                    </Grid>
                                    <Grid container>
                                        <Link
                                            href='https://www.twitter.com'
                                            color='inherit'
                                            target='_blank'
                                            rel="noopener noreferrer"
                                        >
                                            Twitter
                                                </Link>
                                        <Twitter fontSize='small' />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant='subtitle1'>Informazioni</Typography>
                                <Grid container direction='column'>
                                    <Link href='/about-us' color='inherit'>Chi siamo</Link>
                                    <Link href='/contacts' color='inherit'>Contatti</Link>
                                    <Link href='#' color='inherit'>Privacy Policy</Link>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant='subtitle1'>Hai bisogno di aiuto?</Typography>
                                <Grid container direction='column'>
                                    <Link href='#' color='inherit'>Help</Link>
                                    <Link href='/contact-us' color='inherit'>Contattaci</Link>
                                    <Link href='#' color='inherit'>FAQs</Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Typography>
        </footer>
    )
}
