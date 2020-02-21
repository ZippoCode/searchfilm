/*import React from 'react';
import { NavLink } from 'react-router-dom';

// Importing custom UI-Element
import { ButtonPreferite } from '../components/ButtonPreferite';

// Import React-Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// style Material-UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

// style from Styled-Component
import styled from 'styled-components';

const CardPoster = styled(CardMedia)`
    height:270px;
    max-width:182px;
`;

export function CarouselMovie(props) {
    const PATH_POSTER = "https://image.tmdb.org/t/p/w500/";
    const popularMovies = props.movies || [];

    var settings = {
        dots: false,
        slidesToShow: 5,
    };

    return (
        <Slider {...settings}>
            {popularMovies.map((movie, index) =>
                <Card key={index}>
                    <CardPoster
                        image={PATH_POSTER.concat(movie.tmdb_file_path_poster)}
                        title={movie}
                        component={NavLink}
                        to={{ pathname: `/movie/${movie.id}` }}
                    />
                    <p>{movie.title}</p>
                    <ButtonPreferite idMovie={movie.id} />
                </Card>
            )}
        </Slider>
    );
}*/