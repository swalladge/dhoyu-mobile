// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';

import styles from '../styles';

type Props = {
  navigation: any,
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});


class Login extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Login
        </Text>

        <TextInput
          style={{ width: '100%' }}
          placeholder="username"
          onChangeText={text => text}
        />

        <TextInput
          style={{ width: '100%' }}
          secureTextEntry={true}
          placeholder="password"
          onChangeText={text => text}
        />

        <Button
          title="Login!"
          onPress={() => true }
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
