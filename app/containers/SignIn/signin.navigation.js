import * as React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Importing React-Native-Elements
import { Icon } from 'react-native-elements'

// Importing Screen 
import { LoginScreen } from './signin.screen';
import { ChangePasswordScreen } from '../Settings/changePassword.screen';
import { ProfileScreen } from './profile.screen';
import { SettingsScreen } from '../Settings/settings.screen';


import DetailsMovie from '../DetailsMovie/detailsmovie.screen';
import ListMoviesScreen from '../ListMovies/listmovies.screen';
import DetailsPerson from '../DetailsPerson/detailsperson.screen';
import FullCastScreen from '../FullCast/fullcast.screen';

const Stack = createStackNavigator();

const IconsOptions = () => {
    const navigation = useNavigation();

    return (
        <Icon
            onPress={() => { navigation.navigate('Settings') }}
            name='settings-outline'
            type='material-community'
            containerStyle={{ marginHorizontal: 16 }}
        />)
}

function SignInNavigation({ authentication }) {

    return (
        <Stack.Navigator>
            {authentication.token
                ?
                <Stack.Screen
                    name='Profile'
                    component={ProfileScreen}
                    options={{
                        title: 'Profilo',
                        headerRight: () => <IconsOptions />,
                    }}
                />
                : <Stack.Screen
                    name='Sign In'
                    component={LoginScreen}
                    options={{
                        headerRight: () => <IconsOptions />,
                    }}
                />
            }
            <Stack.Screen name='Settings' component={SettingsScreen} />
            <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />
            <Stack.Screen name='DetailsMovie' component={DetailsMovie} />
            <Stack.Screen name='ListMovies' component={ListMoviesScreen} />
            <Stack.Screen name='DetailsPerson' component={DetailsPerson} />
            <Stack.Screen name='FullCast' component={FullCastScreen} />
        </Stack.Navigator>
    )
}

const SignInConnected = connect(state => ({ authentication: state.authentication }))(SignInNavigation);
export { SignInConnected as SignInNavigation };