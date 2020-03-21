import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Button, ActivityIndicator} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Creating custom
const PopularMovieStack = new createStackNavigator();

export default class ListMovieScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    return fetch('http://192.168.1.13:8000/movie/api/topPopular/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          movies: responseJson.results,
        }, function () { });
      })
      .catch((error) => { console.log(error) })
  }

  render(){
    return(
      <View>
        {this.state.isLoading
          ? <ActivityIndicator />
          :
          <View>
          {this.state.movies.map((movie) =>
            <Button
              title={movie.title}
              onPress={() => {
                this.props.navigation.navigate('DetailsMovie', {
                  movieID : movie.id,
                });
              }}/>
          )}
          </View>
        }
      </View>
    )
  }
}
