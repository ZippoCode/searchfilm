import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';



// Importing from Material-UI
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography'

function ListFullMoviePage(props) {

    const { type } = useLocation().state || { type: 'favorite' };
    const movies = useSelector(state => state.authentication[type]) || []

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Container>
            <Typography variant='h5' component='h5' gutterBottom>Lista completa</Typography>
            <List>
                {movies.map((movie, index) =>
                    <ListItem
                        button
                        key={index}
                        component={Link}
                        href={`/movie/${movie.id}`}
                        color='inherit'
                        style={{ fontSize: 18 }}
                    >
                        {movie.title}
                    </ListItem>)}
            </List>
        </Container>
    )
}

export default ListFullMoviePage;