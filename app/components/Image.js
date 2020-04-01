import * as React from 'react';
import { Image as IMG } from 'react-native';

const PATH_IMAGE = 'https://image.tmdb.org/t/p/w500/';

export function ImagePosterMovie(props) {
    const { path, style, ...rest } = props;
    const path_image = path ? { uri: PATH_IMAGE.concat(path) } : require('../assets/img/Movie.jpg');

    return (
        <IMG
            source={path_image}
            style={style}
            {...rest}
        />
    )
}

export function ImagePerson(props) {
    const { path, style, ...rest } = props;
    const path_image = path ? { uri: PATH_IMAGE.concat(path) } : require('../assets/img/Avatar.jpg');

    return (
        <IMG
            source={path_image}
            style={style}
            {...rest}
        />
    )
}