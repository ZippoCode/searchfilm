import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../_helpers/history'
import { userActions } from '../../_actions/user.action';

import { FixedSizeList } from 'react-window';
import styled from 'styled-components';
import { ButtonPreferite } from '../ButtonPreferite';

// Style
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Divider, List } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    body: {
        padding: '8px 4%',
    },
    content: {
        padding: '16px 4%'
    },
    paperPoster: {
        height: 502,
        width: 357,
    }
}));

const StyledTitle = styled(Typography)`
    font-size: 60px;
    text-align: start;
    letter-spacing: -2px;
    margin:'30px 0 25px';
    text-transform:none;
`;

const StyledMovieDetails = styled.div`
    display: flex;
    flex-grow: 1;
    background-color: #1F2120;
    padding: 32px 4%;
    color: white;
`;

const StyledListItemText = styled(ListItemText)`
.MuiTypography-body1{
    color: white;
}
.MuiTypography-body2{
    color: gray;
}
`;

const Description = styled(Typography)`
    margin-top: 60px;
    line-height: 25px;
    font-size: 14px;
    text-rendering:optimizeLegibility;
`;

const StyledFixedSizeList = styled(FixedSizeList)`
::-webkit-scrollbar {
	width: 16px;
	background-color: #1F2120;
}

::-webkit-scrollbar-track {
	border-radius: 16px;
	background-color: white;
}

::-webkit-scrollbar-thumb {
    width: 16px;
	border-radius: 32px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: black;
}`;


export function MovieDetail() {
    const classes = useStyles();
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const PATH_DETAIL_MOVIE = 'http://127.0.0.1:8000/movie/api/get/';
    const PATH_POSTER = "https://image.tmdb.org/t/p/w500/";

    let { id } = useParams();
    let [movie, setMovie] = useState('');
    let [loadingImage, setLoadingImage] = useState(false);
    let [actors, setActors] = useState([]);
    let [directors, setDirectors] = useState([]);
    let [posterURL, setPosterUrl] = useState('');
    let button = <ButtonPreferite id={movie.id} title={movie.title} />;
    const [value_vote, handleVote] = useState('');
    const [values] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const handleAddVote = () => {
        if (!user) {
            return history.push('/login');
        }
        return dispatch(userActions.add_vote(user, id, value_vote));
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(PATH_DETAIL_MOVIE.concat(id))
                .then(response => response.json())
                .then(data => { return data })
                .catch(err => { return err });
            setMovie(result);
            setActors(result.actors);
            setDirectors(result.directors)
            setPosterUrl(result.tmdb_file_path_poster);
            setLoadingImage(true);
        };
        fetchData();
    }, [id]);

    return (
        <StyledMovieDetails>
            <Grid container className={classes.body} spacing={3}>
                <Grid item xs={6}>
                    <Grid container className={classes.content} justify='center'>
                        <Grid container direction='column' alignItems='center'>
                            <Grid item>
                                {loadingImage ?
                                    <img alt='poster movie' className={classes.paperPoster} src={PATH_POSTER.concat(posterURL)} />
                                    :
                                    <img alt='' />}
                            </Grid>
                            <Grid item>
                                {button}
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <Select
                                        labelId='genres-choices-label'
                                        id='vote-value'
                                        value={value_vote}
                                        onChange={(event) => { handleVote(event.target.value) }}
                                    >
                                        {values.map((value, index) => <MenuItem key={index} value={value}>{value}</MenuItem>)}
                                    </Select>
                                    <Button variant='contained' onClick={handleAddVote} >Vota</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify='flex-end' alignItems='flex-start'>
                        <Typography component='h6' variant='h6'>{movie.release_date}</Typography>
                    </Grid>
                    <div style={{ padding: 16 }}>
                        <StyledTitle component='h1' variant='h1'>{movie.title}</StyledTitle>
                    </div>
                    <Divider />
                    <Grid container justify='space-around' direction='column'>
                        <Typography component='h5' variant='h5'>Numero voti: {movie.vote_counter}</Typography>
                        <Typography component='h5' variant='h5'>Voto medio {movie.vote_average}</Typography>
                    </Grid>
                    <Grid item>
                        <Description>{movie.description}</Description>
                    </Grid>
                    <h3>Registi:</h3>
                    <List>
                        {directors.map((director, idx) => (
                            <ListItem
                                key={idx}
                                button
                                component={NavLink}
                                to={{
                                    pathname: `/person/${director.id_person}`
                                }}
                            >
                                <ListItemText
                                    primary={director.first_name + " " + director.second_name}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant='h6' component='h6'>Attori</Typography>
                            <StyledFixedSizeList
                                height={400}
                                width={500}
                                itemSize={46}
                                itemCount={actors.length}
                                itemData={actors}
                            >
                                {renderRowActor}
                            </StyledFixedSizeList>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StyledMovieDetails>
    )
}

function renderRowActor(props) {
    let { index, style, data } = props;

    return (
        <ListItem
            button
            style={style}
            key={index}
            component={NavLink}
            to={{
                pathname: `/person/${data[index].person_id}/`
            }}
        >
            <StyledListItemText
                primary={data[index].person}
                secondary={data[index].name_character}
            />
        </ListItem >
    );
}