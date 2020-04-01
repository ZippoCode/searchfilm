import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importing Screen
import DetailsMovie from '../containers/DetailsMovie/detailsmovie.screen';
import DetailsPerson from '../containers/DetailsPerson/detailsperson.screen';
import FullCastScreen from '../containers/FullCast/fullcast.screen';

const Stack = createStackNavigator();

export function NavigatorScreen() {
    return (
        <>
            <Stack.Screen name='DetailsMovie' component={DetailsMovie} />
            <Stack.Screen name='DetailsPerson' component={DetailsPerson} />
            <Stack.Screen name='FullCast' component={FullCastScreen} />
        </>
    )
}