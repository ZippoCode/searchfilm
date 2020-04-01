import * as React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Navigations
import { HomeNavigation } from '../Home/home.navigation';
import ListButtonsNavigation from '../ListButtons/listbuttons.navigator';
import SearchNavigation from '../SearchMovie/navigation';
import { SignInNavigation } from '../SignIn/signin.navigation';

// Importing the Authentication's constants for restore token when the app has closed
import { AuthenticationConstants } from '../SignIn/constants';


const Tab = createBottomTabNavigator();

function TabNavigation({ dispatch }) {

    React.useEffect(() => {
        function restoreToken() {
            AsyncStorage.getItem('userToken')
                .then((token) => {
                    dispatch({ type: AuthenticationConstants.LOGIN_SUCCESS, token });
                });
        }
        restoreToken();
    }, []);

    return (
        <Tab.Navigator
            tabBarOptions={{ keyboardHidesTabBar: true }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline'
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                    } else if (route.name === 'List') {
                        iconName = focused
                            ? 'local-movies'
                            : 'local-movies'
                        return <MaterialIcons name={iconName} size={size} color={color} />
                    } else if (route.name === 'Search') {
                        iconName = focused
                            ? 'search'
                            : 'search'
                        return <MaterialIcons name={iconName} size={size} color={color} />
                    } else if (route.name === 'Account') {
                        iconName = focused
                            ? 'account'
                            : 'account-outline'
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                    }
                }
            })}
        >
            <Tab.Screen name='Home' component={HomeNavigation}/>
            <Tab.Screen name='List' component={ListButtonsNavigation} />
            <Tab.Screen name='Search' component={SearchNavigation} />
            <Tab.Screen name='Account' component={SignInNavigation} />
        </Tab.Navigator>
    )
}

const TabNavigationConnected = connect()(TabNavigation);
export { TabNavigationConnected as TabNavigation }