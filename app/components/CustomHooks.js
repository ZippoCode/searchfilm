import * as React from 'react';

export function useStateMovie(id) {
    const [movie, setMovie] = React.useState('');

    React.useEffect(() => {
        const fetchAsyncDataMovie = async () => {
            fetch(`http://192.168.1.13:8000/movie/api/get/${id}/`)
                .then((response) => response.json())
                .then((json) => setMovie(json))
                .catch((error) => console.log(error))
        };
        fetchAsyncDataMovie();
    }, [id]);

    return movie ? movie : '';
}