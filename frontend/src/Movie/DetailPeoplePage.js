import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

// Importing style from Material-UI
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
        '& h3': { fontWeight: 'bold' },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        }
    },
    info: {
        textAlign: 'left',
    },
    image: {
        width: theme.spacing(45),
        height: theme.spacing(45),
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(25),
            height: theme.spacing(25),
        }
    }
});

function DetailPeoplePage(props) {

    const { id } = useParams();
    const { classes } = props;
    const [person, setPerson] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/person/api/get/${id}`);
                setPerson(response.data);
            } catch (error) { }
        }
        fetchData();
    }, [id]);

    return (
        <Container className={classes.root}>
            {person ?
                <Grid container className={classes.info} justify='center'>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h3' component='h3' gutterBottom>{person.name} </Typography>
                        <Avatar
                            alt={person.name}
                            src={`https://image.tmdb.org/t/p/w500/${person.profile_img}`}
                            className={classes.image}
                            variant='rounded'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography paragraph>
                            Data di nascita: {new Date(person.birth_date).toDateString()}
                        </Typography>
                        {person.death_date &&
                            <Typography paragraph>
                                Data di morte: {new Date(person.death_date).toDateString()}
                            </Typography>
                        }
                        <Typography paragraph>
                            Luogo di nascita: {person.place_of_birth} <br/>
                            Nazionalità: {person.nationality}
                        </Typography>
                        <Typography paragraph>Sesso: {person.gender}</Typography>
                        <Typography paragraph>
                            Biografia: <br />{person.biography}
                        </Typography>
                        <Divider/>
                        <Link href={`https://www.imdb.com/name/${person.imdb_id}/`} target='_blank' color='inherit'> Link IMDb</Link>
                    </Grid>
                </Grid>
                :
                <CircularProgress />
            }
        </Container>
    )
}

export default withStyles(styles)(DetailPeoplePage);