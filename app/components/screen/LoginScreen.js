import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, Button, TextInput} from 'react-native';

import styled from 'styled-components/native';

const StyledTextInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
`;

export default class LoginScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }


  render (){
    return(
      <View style={{marginHorizontal: 32}}>
        <Text>Effettua il Login</Text>
        <Text>E-Mail</Text>
        <StyledTextInput
          value={this.state.email}
          onChangeText={text => {this.setState({email: text})}}
          textContentType='emailAddress'
          />
        <Text>Password </Text>
        <StyledTextInput
          name='password'
          value={this.state.password}
          onChangeText={text => {this.setState({password: text})}}
          textContentType='password'
          />
        <Button title='Login' />
      </View>
    )
  }
}
