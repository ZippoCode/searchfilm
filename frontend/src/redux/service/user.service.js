export const userService = {
    register,
}

async function register(user) {
    const requestInfo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return await fetch('http://127.0.0.1:8000/account/api/auth/register', requestInfo)
        .then();
}