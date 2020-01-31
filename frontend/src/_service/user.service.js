const PATH_LOGIN = 'http://127.0.0.1:8000/account/api/auth/login';
const PATH_LOGOUT = 'http://127.0.0.1:8000/account/api/auth/logout';
const PATH_CHANGE_PASSWORD = 'http://127.0.0.1:8000/account/api/auth/change_password';
const PATH_FAVORITE = 'http://127.0.0.1:8000/account/api/favorite';
const PATH_VOTE = 'http://127.0.0.1:8000/account/api/voted';


export const userService = {
    login,
    logout,
    change_password,
    register,
    put_favorite,
    remove_favorite,
    add_vote,
    remove_vote
}

// Login
function login(username, password) {
    const requestInfo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }
    return fetch(PATH_LOGIN, requestInfo)
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

// Change passowrd of user
function change_password(token, old_password, new_password) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(token));
    var formdata = new FormData();
    formdata.append("old_password", old_password);
    formdata.append("new_password", new_password);

    var requestOptions = {
        method: 'PUT',
        headers: headers,
        body: formdata,
    };

    return fetch(PATH_CHANGE_PASSWORD, requestOptions)
        .then(handleResponse)
        .then(user => { return user });
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
            const currentUser = JSON.parse(localStorage.getItem('user'));
            currentUser.favorites = user.favorites
            localStorage.setItem('user', JSON.stringify(currentUser));
            return currentUser;
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
            const currentUser = JSON.parse(localStorage.getItem('user'));
            currentUser.favorites = user.favorites
            localStorage.setItem('user', JSON.stringify(currentUser));
            return currentUser;
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
            const currentUser = JSON.parse(localStorage.getItem('user'));
            currentUser.voted = user.voted
            localStorage.setItem('user', JSON.stringify(currentUser));
            return currentUser;
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
            const currentUser = JSON.parse(localStorage.getItem('user'));
            currentUser.voted = user.voted
            localStorage.setItem('user', JSON.stringify(currentUser));
            return currentUser;
        });
}


function handleResponse(response) {
    console.log(response)
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}