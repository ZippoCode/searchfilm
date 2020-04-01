import * as React from 'react';
import { GET_MOVIE } from './Matcher';

export function useStateMovie(id) {
    const [movie, setMovie] = React.useState('');

    React.useEffect(() => {
        const fetchAsyncDataMovie = async () => {
            fetch(GET_MOVIE.concat(id).concat('/'))
                .then((response) => response.json())
                .then((json) => setMovie(json))
                .catch((error) => console.log(error))
        };
        fetchAsyncDataMovie();
    }, [id]);

    return movie ? movie : '';
}