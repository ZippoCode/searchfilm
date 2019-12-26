const PATH_LOGIN = 'http://127.0.0.1:8000/account/api/auth/login';
const PATH_LOGOUT = 'http://127.0.0.1:8000/account/api/auth/logout';
const PATH_FAVORITE = 'http://127.0.0.1:8000/account/api/favorite';
const PATH_VOTE = 'http://127.0.0.1:8000/account/api/voted';


async function login(username, password) {
    const requestInfo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }


    return await fetch(PATH_LOGIN, requestInfo)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })
}

function logout(token) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(token));

    var requestOptions = {
        method: 'GET',
        headers: headers,
    };

    fetch(PATH_LOGOUT, requestOptions)
        .then(localStorage.removeItem('user'))
    localStorage.removeItem('user')
}


async function register(user) {
    const requestInfo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return await fetch('http://127.0.0.1:8000/account/api/auth/register', requestInfo)
        .then(handleResponse);
}



async function put_favorite(user, id_movie) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(user.token));

    var formdata = new FormData();
    formdata.append("id", id_movie);

    var requestOptions = {
        method: 'PUT',
        headers: headers,
        body: formdata,
    };

    return await fetch(PATH_FAVORITE, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

async function remove_favorite(user, id_movie) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(user.token));

    var formdata = new FormData();
    formdata.append("id", id_movie);

    var requestOptions = {
        method: 'DELETE',
        headers: headers,
        body: formdata,
    };

    return await fetch(PATH_FAVORITE, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}



async function add_vote(user, id_movie, value_vote) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(user.token));
    var formdata = new FormData();
    formdata.append("id", id_movie);
    formdata.append("value_vote", value_vote)

    var requestOptions = {
        method: 'PUT',
        headers: headers,
        body: formdata,
    };

    return await fetch(PATH_VOTE, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

async function remove_vote(user, id_movie) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(user.token));

    var formdata = new FormData();
    formdata.append("id", id_movie);

    var requestOptions = {
        method: 'DELETE',
        headers: headers,
        body: formdata,
    };

    return await fetch(PATH_VOTE, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}


function handleResponse(response) {
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            console.log(response);
            if (!response.ok) {
                if (response.status === 400) {
                    logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}



export const userService = {
    login,
    logout,
    register,
    put_favorite,
    remove_favorite,
    add_vote,
    remove_vote
}
