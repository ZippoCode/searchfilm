import 'react-native-gesture-handler';
import * as React from 'react';
import { AsyncStorage } from 'react-native';

import { Icon } from 'react-native-elements'

import { createStackNavigator } from '@react-navigation/stack';

// Importing Screen 
import LoginScreen from './signin.screen';
import ProfileScreen from './profile.screen';


// Importing Details Movie Screen - TO DO: EDIT PATH
import DetailsMovies from '../DetailsMovie/detailsmovie.screen';
import ListMoviesScreen from '../ListMovies/listmovies.screen';


const Stack = createStackNavigator();
export const AuthContext = React.createContext();

export default function SignInNavigation({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        const loadingAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (error) {
                //Restoring token failed
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        loadingAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                // Login REQUEST -- MISS USERNAME and PASSWORD parameters
                fetch('http://192.168.1.13:8000/api/token/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: data.username.toLowerCase(),
                        password: data.password,
                    })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        async () => {
                            try {
                                await AsyncStorage.setItem('userToken', responseJson.token)
                            } catch (error) { console.log(error); }
                        }
                        dispatch({ type: 'SIGN_IN', token: responseJson.token })
                    })
                    .catch((error) => { console.log(error) });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                // TO-DO signUp
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
                {state.userToken == null
                    ? <Stack.Screen
                        name='Account'
                        component={LoginScreen}
                        options={{
                            headerRight: () => <IconsOptions />,
                        }}
                    />
                    : <Stack.Screen
                        name='Profile'
                        component={ProfileScreen}
                        initialParams={{ userToken: state.userToken }}
                        options={{
                            title: 'Informazioni',
                            headerRight: () => <IconsOptions />,
                        }}
                    />
                }
                <Stack.Screen name='DetailsMovie' component={DetailsMovies} />
                <Stack.Screen name='ListMovies' component={ListMoviesScreen} />
            </Stack.Navigator>
        </AuthContext.Provider>
    )
}

const IconsOptions = () => {
    return (
        <Icon
            onPress={() => alert('This is a button!')}
            name='settings-outline'
            type='material-community'
        />)
}
