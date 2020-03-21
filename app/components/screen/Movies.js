import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import ListMovie from '../navigation/ListMovies';
import DetailsMovie from './DetailsMovie';
import DetailsPerson from './DetailsPerson';

import styled from 'styled-components/native';

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginHorizontal: 16,
  },
});


const StyledView = styled.View`
  color: palevioletred;
  background-color: palevioletred;
`;

const StyledText = styled.Text`
  color: palevioletred;
`

class ListGenresScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    return fetch('http://192.168.1.13:8000/movie/api/genres/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          genres: responseJson,
        }, function () { });
      })
      .catch((error) => { console.log(error) })
  }

  render(){
    return(
      <View>
        {this.state.isLoading
          ? <ActivityIndicator />
          : this.state.genres.map((genre) =>
            <Button key={genre.name} title={genre.name}/>
          )
      }
      </View>
    )
  }
}

function ButtonScreen({navigation}){
  return(

    <StyledView style={styles.container}>
    <StyledText>Prova</StyledText>
    <Button
      title='I più popolari'
      onPress={() => navigation.navigate('Popular')}
      />
      <Button
        title='I più votati'
        />
      <Button
        title='I più recenti'
        />
      <Button
        title='Liste per genere'
        onPress={() => navigation.navigate('Generi')}
        />
    </StyledView>
  )
}


const ButtonsStack = new createStackNavigator();

export default function ListButtonsStackScreen(){

    return(
      <ButtonsStack.Navigator>
        <ButtonsStack.Screen name='Liste' component={ButtonScreen}/>
        <ButtonsStack.Screen name='Popular' component={ListMovie} />
        <ButtonsStack.Screen name='Generi' component={ListGenresScreen}/>
        <ButtonsStack.Screen name='DetailsMovie' component={DetailsMovie}/>
        <ButtonsStack.Screen name='DetailsPerson' component={DetailsPerson}/>
      </ButtonsStack.Navigator>
    )
  }
