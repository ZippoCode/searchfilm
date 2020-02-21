const PATH_VOTE = 'http://127.0.0.1:8000/account/api/voted';


export const userService = {
    register,
    add_vote,
    remove_vote
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

async function add_vote(user, id_movie, value_vote) {
    var headers = new Headers();
    headers.append("Authorization", "Token ".concat(user.token));
    var formdata = new FormData();
    formdata.append("id", id_movie);
    formdata.append("value_vote", value_vote);

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
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    //logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}