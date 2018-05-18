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

import { registerPasswordChanged, registerUsernameChanged, registerAction } from '../actions';

type Props = {
  navigation: any,
  usernameChanged: (string) => void,
  passwordChanged: (string) => void,
  registerClicked: () => void,
  registerErrorMsg: string,
};

const mapStateToProps = state => ({
  registerErrorMsg: state.user.registerError || '',
});

const mapDispatchToProps = dispatch => ({
  usernameChanged: (text: string) => {
    dispatch(registerUsernameChanged(text));
  },
  passwordChanged: (text: string) => {
    dispatch(registerPasswordChanged(text));
  },
  registerClicked: () => {
    dispatch(registerAction());
  },
});


class Register extends Component<Props> {
  render() {
    let error;
    if (this.props.registerErrorMsg.length > 0) {
      error = <Text>{this.props.registerErrorMsg}</Text>;
    }


    return (
      <View style={styles.container}>
        <Text>
          Register
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

        <View style={styles.verticalPadded}>
        <Button
          title="Register!"
          onPress={() => this.props.registerClicked()}
        />
        </View>

        <View style={styles.verticalPadded}>
        <Button
          title="I already have an account"
          onPress={() =>
            this.props.navigation.navigate('loginScreen')}
        />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
