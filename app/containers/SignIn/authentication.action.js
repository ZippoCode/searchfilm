import { AuthenticationConstants } from './constants';
import { AsyncStorage } from 'react-native';

export function login(username, password) {
    return dispatch => {
        dispatch({ type: AuthenticationConstants.LOGIN_REQUEST });
        fetch('http://192.168.1.13:8000/api/token/', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.toLowerCase(),
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                async () => {
                    try {
                        await AsyncStorage.setItem('userToken', responseJson.token)
                    } catch (error) { console.log(error); }
                }
                dispatch({ type: AuthenticationConstants.LOGIN_SUCCESS, token: responseJson.token })
            })
            .catch((error) => dispatch({ type: AuthenticationConstants.LOGIN_FAILURE }))
    }
}

export function logout() {
    return dispatch => {
        AsyncStorage.removeItem('userToken')
            .then(dispatch({ type: AuthenticationConstants.LOGOUT }))
    }
}