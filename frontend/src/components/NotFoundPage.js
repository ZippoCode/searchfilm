import React from 'react';
import { Link } from 'react-router-dom';

// Style from Material-UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Importing Icon
import HomeIcon from '@material-ui/icons/Home';


function NotFoundPage() {
    return (
        <Grid container justify='center' alignItems='flex-end' >
            <Grid item xs={3}>
                <h1>Ooops!</h1>
                <h2>404 Not found!</h2>
                <p>La pagina che stai cercando non esiste. Torna alla home</p>
                <Button component={Link} to='/' variant='contained'>
                    <HomeIcon />
                    Ritorna alla Home
                </Button>
            </Grid>
        </Grid>
    )
}

export default NotFoundPage;