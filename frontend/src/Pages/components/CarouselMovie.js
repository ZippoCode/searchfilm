import React from 'react';
import PropTypes from 'prop-types';

// Importing custom UI-Element
import ButtonPreferite from '../../components/ButtonPreferite';

// Import React-Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Style from Material-UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(7),
        padding: theme.spacing(4),
    },
    title: {
        display: 'flex',
        alignItems: 'baseline',
        '& .MuiTypography-root': { margin: theme.spacing(3), }
    },
    posterMovie: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        width: '300px !important',
        marginRight: theme.spacing(3),
        '&:hover': { opacity: 0.9, },
    },
});


function CarouselMovie(props) {
    const { classes } = props;
    const popularMovies = props.movies || [];
    const PATH_POSTER = "https://image.tmdb.org/t/p/w500";

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        swipeToSlide: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                    arrows: false,
                },
            },
        ]
    };

    return (
        <section className={classes.root}>
            <div className={classes.title}>
                <Typography variant='h4' component='h2' align='left' gutterBottom> I film più popolari</Typography>
                <Button>Visualizzali tutti</Button>
            </div>
            <Slider {...settings}>
                {popularMovies.map((movie) =>
                    <Card className={classes.posterMovie} key={movie.id}>
                        <CardActionArea
                            component={Link}
                            href={`/movie/${movie.id}`}
                            underline='none'
                        >
                            <CardMedia
                                component='img'
                                alt={movie.poster}
                                height='120%'
                                image={PATH_POSTER.concat(movie.poster_path)}
                                title={movie.title}
                                style={{ maxHeight: '450px' }}
                            />
                            <CardContent>
                                <Typography variant='h5' component='h1'>{movie.title}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <ButtonPreferite idMovie={movie.id} />
                        </CardActions>
                    </Card>
                )}
            </Slider>
        </section>
    );
}

CarouselMovie.propTypes = {
    movies: PropTypes.array,
};

export default withStyles(styles)(CarouselMovie);