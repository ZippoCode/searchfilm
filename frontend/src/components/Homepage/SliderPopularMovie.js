import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles(theme => ({
    cardMoviePopular: {
        background: '#212121',
    },
    mediaPoster: {
        margin: '5px',
        height: 400,
    },
    contentPopularMovie: {
        background: '#DDDDDD'
    },
}));

const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
};


export function SliderPopularMovie() {
    const classes = useStyles();

    const PATH_POPULAR = 'http://127.0.0.1:8000/movie/api/topPopular';
    const PATH_POSTER = "https://image.tmdb.org/t/p/w500/";
    const [popularMovie, setPopularMovie] = useState([]);

    useEffect(() => {
        const fetchDataPopularMovies = async () => {
            const result = await fetch(PATH_POPULAR)
                .then(response => response.json())
                .then(data => { return data })
                .catch(error => console.log(error));
            setPopularMovie(result);
        }
        fetchDataPopularMovies();
    }, []);

    return (
        <Slider {...settings}>
            {popularMovie.map((movie, index) =>
                <Card
                    className={classes.cardMoviePopular}
                    key={index}
                >
                    <CardActionArea key={index}>
                        <CardMedia
                            className={classes.mediaPoster}
                            image={PATH_POSTER.concat(movie.tmdb_file_path_poster)}
                            component={NavLink}
                            to={{ pathname: `/movie/${movie.id}` }}
                        />
                        <CardContent className={classes.contentPopularMovie}>
                            <Grid container wrap='nowrap'>
                                <Grid item xs zeroMinWidth>
                                    <Typography noWrap component='h1' variant='h6'>{movie.title}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions className={classes.contentPopularMovie}>
                        </CardActions>
                    </CardActionArea>
                </Card>
            )}
        </Slider >
    )
}