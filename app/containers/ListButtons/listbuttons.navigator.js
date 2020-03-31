import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importing Screen
import ButtonScreen from './listbuttons.screen';
import DetailsMovie from '../DetailsMovie/detailsmovie.screen';
import DetailsPerson from '../DetailsPerson/detailsperson.screen';
import FullCastScreen from '../FullCast/fullcast.screen';
import ListMovieScreen from '../ListMovies/listmovies.screen';
import ListGenresScreen from './listgenres.screen';

const ButtonsStack = new createStackNavigator;

export default function ListButtonsNavigation() {

    return (
        <ButtonsStack.Navigator>
            <ButtonsStack.Screen name='Liste' component={ButtonScreen} />
            <ButtonsStack.Screen
                name='topPopular'
                component={ListMovieScreen}
                options={{ title: 'Popolari' }}
            />
            <ButtonsStack.Screen
                name='topRanking'
                component={ListMovieScreen}
                options={{ title: 'I più votati' }}
            />
            <ButtonsStack.Screen
                name='last'
                component={ListMovieScreen}
                options={{ title: 'Usciti recentemente' }}
            />
            <ButtonsStack.Screen
                name='genre'
                component={ListMovieScreen}
            />
            <ButtonsStack.Screen name='Generi' component={ListGenresScreen} />
            <ButtonsStack.Screen name='DetailsMovie' component={DetailsMovie} />
            <ButtonsStack.Screen name='DetailsPerson' component={DetailsPerson} />
            <ButtonsStack.Screen name='FullCast' component={FullCastScreen} />
        </ButtonsStack.Navigator>
    )
}