import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importing Screen
import DetailsMovie from '../DetailsMovie/detailsmovie.screen';
import DetailsPerson from '../DetailsPerson/detailsperson.screen';
import FullCastScreen from '../FullCast/fullcast.screen';
import SearchScreen from './searchmovie.screen';

const SearchMovieStack = new createStackNavigator();

export default function SearchNavigation() {

    return (
        <SearchMovieStack.Navigator>
            <SearchMovieStack.Screen name='Search' component={SearchScreen} options={{ headerShown: false }} />
            <SearchMovieStack.Screen name='DetailsMovie' component={DetailsMovie} />
            <SearchMovieStack.Screen name='DetailsPerson' component={DetailsPerson} />
            <SearchMovieStack.Screen name='FullCast' component={FullCastScreen} />
        </SearchMovieStack.Navigator>
    )
}