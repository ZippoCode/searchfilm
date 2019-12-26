const PATH_POPULAR = 'http://127.0.0.1:8000/movie/api/topPopular';
const PATH_POPULAR_GENRE = 'http://127.0.0.1:8000/movie/api/topPopular/';
const PATH_RANKING = 'http://127.0.0.1:8000/movie/api/topRanking';

function getTopPopular() {

    return fetch(PATH_POPULAR)
        .then(response => {
            return response.json();
        })
        .then(data => { return data })
        .catch(error => console.log(error))
}


function getTopPopularWithGenre(genre) {
    console.log(genre);
    return fetch(PATH_POPULAR_GENRE.concat(genre))
        .then(response => {
            return response.json();
        })
        .then(data => { return data })
        .catch(error => console.log(error))
}

async function getTopRanked() {
    return fetch(PATH_RANKING)
        .then(response => {
            return response.json();
        }).then(data => { return data })
        .catch(error => console.log(error))
}


export const movieService = {
    getTopPopular,
    getTopPopularWithGenre,
    getTopRanked,
}