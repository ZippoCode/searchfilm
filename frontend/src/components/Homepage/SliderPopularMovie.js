import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Personal Importing
import { ButtonPreferite } from './../ButtonPreferite';


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
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    padding:'50',
};


export function SliderPopularMovie(props) {
    const classes = useStyles();

    const popularMovie = props.popularMovie;

    return (
        <Slider {...settings}>
            {popularMovie.map((movie) =>
                <Card className={classes.cardMoviePopular}>
                    <CardActionArea>
                        <Link to={{
                            pathname: `/movie/${movie.id}`
                        }}>
                            <CardMedia
                                className={classes.mediaPoster}
                                image={"https://image.tmdb.org/t/p/w500/".concat(movie.tmdb_file_path_poster)}
                            />
                        </Link>
                        <CardContent className={classes.contentPopularMovie}>
                            <Typography variant='body1'>{movie.title}</Typography>
                        </CardContent>
                        <CardActions className={classes.contentPopularMovie}>
                            < ButtonPreferite id={movie.id} title={movie.title} />
                        </CardActions>
                    </CardActionArea>
                </Card>
            )}
        </Slider>
    )
}