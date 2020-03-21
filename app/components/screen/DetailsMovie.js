import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Button, ActivityIndicator, Image} from 'react-native';


export default class DetailsMovie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    const params = this.props.route.params;
    return fetch(`http://192.168.1.13:8000/movie/api/get/${JSON.stringify(params.movieID)}/`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          movie: responseJson,
        }, function () { });
      })
      .catch((error) => { console.log(error) })
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ScrollView>
        <Text>{this.state.movie.title}</Text>
        <Text>{this.state.movie.original_title}</Text>
        <Text>{this.state.movie.description}</Text>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`}}
            style={{width: 300, height: 300}} />
          <FlatList
            data={this.state.movie.actors}
            renderItem={({item}) =>
              <Button
                title={item.name}
                onPress={() => {this.props.navigation.navigate('DetailsPerson', {
                  personID: item.id,
                })}}
                />
            }
          />
      </ScrollView>
    )
  }

}
