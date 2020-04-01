import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importing Screen
import { Home } from './home.screen';
import DetailsMovie from '../DetailsMovie/detailsmovie.screen';
import DetailsPerson from '../DetailsPerson/detailsperson.screen';
import FullCastScreen from '../FullCast/fullcast.screen';

const HomeStack = new createStackNavigator();


export function HomeNavigation() {

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name='Search'
                component={Home}
                options={{
                    headerShown: false,
                }} />
            <HomeStack.Screen name='DetailsMovie' component={DetailsMovie} />
            <HomeStack.Screen name='DetailsPerson' component={DetailsPerson} />
            <HomeStack.Screen name='FullCast' component={FullCastScreen} />
        </HomeStack.Navigator>
    )
}