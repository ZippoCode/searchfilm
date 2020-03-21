import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, ActivityIndicator} from 'react-native';

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
          : this.state.movies.map((movie) =>
            <Text key={movie.title}>{movie.title}</Text>
          )
      }
      </View>
    )
  }
}
