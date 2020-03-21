import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Image} from 'react-native';


export default class DetailsPerson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    const params = this.props.route.params;
    return fetch(`http://192.168.1.13:8000/person/api/get/${params.personID}/`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          person: responseJson,
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
      <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.person.name}</Text>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${this.state.person.profile_img}`}}
            style={{width: 300, height: 300}} />
      </View >
    )
  }

}
