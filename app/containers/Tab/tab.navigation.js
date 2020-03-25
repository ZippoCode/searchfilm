import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


import SignInNavigation from '../SignIn/signin.navigation';
import ListButtonsNavigation from '../ListButtons/listbuttons.navigator';
import SearchScreen from '../SearchMovie/searchmovie.screen';

const Tab = createBottomTabNavigator();

function Home({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Now. I'm very happy</Text>
            <Button title='Ricerca un film' />
        </View>
    )
}

export default function TabNavigation() {
    return (
        <Tab.Navigator
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
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='List' component={ListButtonsNavigation} />
            <Tab.Screen name='Search' component={SearchScreen} />
            <Tab.Screen name='Account' component={SignInNavigation} />
        </Tab.Navigator>
    )
}
