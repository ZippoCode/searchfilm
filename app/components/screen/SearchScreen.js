import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, TextInput, Button} from 'react-native';

// Importing navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default class SearchScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      query: 'Ricerca un film',
      suggestedMovie: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(text){
    this.setState(state => ({ query:text}));
    fetch(`http://192.168.1.13:8000/movie/api/title/?search=${text}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          suggestedMovie: responseJson,
        }, function () { });
      })
      .catch((error) => { console.log(error) })
}


  render(){
    const {isLoading, query, suggestedMovie} = this.state;
    return(
        <View
        style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
        onChangeText={this.handleChange}
        value={query}
        />
        {!isLoading && suggestedMovie.map((movie) => <Text>{movie.title}</Text>)}
        </View>
    )
  }
}
