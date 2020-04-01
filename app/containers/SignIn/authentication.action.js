import { AuthenticationConstants } from './constants';
import { AsyncStorage } from 'react-native';

// Import Urls
import { GET_TOKEN } from '../../components/Matcher';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

export function login(username, password) {
    return dispatch => {
        dispatch({ type: AuthenticationConstants.LOGIN_REQUEST });
        fetch(GET_TOKEN, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.toLowerCase(),
                password: password,
            })
        })
            .then(handleErrors)
            .then((responseJson) => {
                async () => {
                    try {
                        await AsyncStorage.setItem('userToken', responseJson.token)
                    } catch (error) { console.log(error); }
                }
                dispatch({ type: AuthenticationConstants.LOGIN_SUCCESS, token: responseJson.token })
            })
            .catch((error) => {
                dispatch({ type: AuthenticationConstants.LOGIN_FAILURE, error: error })
            })
    }
}

export function logout() {
    return dispatch => {
        AsyncStorage.removeItem('userToken')
            .then(dispatch({ type: AuthenticationConstants.LOGOUT }))
    }
}