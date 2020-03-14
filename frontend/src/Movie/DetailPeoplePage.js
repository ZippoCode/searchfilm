import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

// Importing style from Material-UI
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(5),
        textAlign: 'left'
    },
});

function DetailPeoplePage(props) {

    const { id } = useParams();
    const { classes } = props;
    const [person, setPerson] = useState({
        name: '',
        type: '',
        gender: '',
        birth_date: '',
        death_date: '',
        place_of_birth: '',
        biography: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/person/api/get/${id}/`);
                setPerson(response.data);
            } catch (error) { }
        }
        fetchData();
    }, [id]);

    return (
        <div>{person ?
            <Container className={classes.root}>
                <Typography variant='h4' component='h4'>Dettagli</Typography>
                <h3>Nome: {person.name} </h3>
                <h3>Sesso: {person.gender}</h3>
                <h3>Data di nascita: {new Date(person.birth_date).toDateString()}</h3>
                {person.death_date &&
                    <h3>Data di morte: {new Date(person.death_date).toDateString()}</h3>
                }
                <h3>Luogo di nascita: {person.place_of_birth}</h3>
                <h3>Biografia: {person.biography}</h3>
            </Container>
            : <></>
        }
        </div>
    )
}

export default withStyles(styles)(DetailPeoplePage);