
function login(username, password) {
    const requestInfo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }


    return fetch('http://127.0.0.1:8000/account/api/auth/login', requestInfo)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })
        .catch(error => {
            console.log(error);
            alert('Credenziali errate. Error: ' + error.status);
        });
}

function logout() {
    localStorage.removeItem('user');
}


function register(user) {
    const requestInfo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch('http://127.0.0.1:8000/account/api/auth/register', requestInfo)
        .then(handleResponse);
}



function put_favorite(user, id_movie) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(user.token));

    var formdata = new FormData();
    formdata.append("id", id_movie);

    var requestOptions = {
        method: 'PUT',
        headers: headers,
        body: formdata,
    };

    return fetch("http://127.0.0.1:8000/account/api/movies", requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
            return user;
        });
}

function remove_favorite(user, id_movie) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(user.token));

    var formdata = new FormData();
    formdata.append("id", id_movie);

    var requestOptions = {
        method: 'DELETE',
        headers: headers,
        body: formdata,
    };

    return fetch("http://127.0.0.1:8000/account/api/movies", requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
            return user;
        });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
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
    remove_favorite
}
