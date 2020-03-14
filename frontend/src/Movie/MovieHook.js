import { useEffect, useState } from 'react';

import axios from 'axios';
import * as URL from '../helpers/matcher';

function useMovieState(id) {
    const [movie, setMovie] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await axios.get(URL.DETAILSMOVIE.concat(id));
            setMovie(response.data);
        }
        fetchMovie();
    }, [id])

    return (movie)
}

export default useMovieState;