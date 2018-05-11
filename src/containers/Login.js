// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';

import styles from '../styles';

import { loginAction, loginPasswordChanged, loginUsernameChanged } from '../actions';

type Props = {
  navigation: any,
  usernameChanged: (string) => void,
  passwordChanged: (string) => void,
  loginClicked: () => void,
  loginErrorMsg: string,
};


const mapStateToProps = state => ({
  loginErrorMsg: state.user.loginError || '',
});

const mapDispatchToProps = dispatch => ({
  usernameChanged: (text: string) => {
    dispatch(loginUsernameChanged(text));
  },
  passwordChanged: (text: string) => {
    dispatch(loginPasswordChanged(text));
  },
  loginClicked: () => {
    dispatch(loginAction());
  },
});


class Login extends Component<Props> {
  render() {
    let error;
    if (this.props.loginErrorMsg.length > 0) {
      error = <Text>{this.props.loginErrorMsg}</Text>;
    }


    return (
      <View style={styles.container}>
        <Text>
          Login
        </Text>

        {error}

        <TextInput
          style={{ width: '100%' }}
          placeholder="username"
          onChangeText={text => this.props.usernameChanged(text)}
        />

        <TextInput
          style={{ width: '100%' }}
          secureTextEntry
          placeholder="password"
          onChangeText={text => this.props.passwordChanged(text)}
        />

        <Button
          title="Login!"
          onPress={() => this.props.loginClicked()}
        />

        <Button
          title="I do not have an account"
          onPress={() =>
            this.props.navigation.navigate('registerScreen')}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
