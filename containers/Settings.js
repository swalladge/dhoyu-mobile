// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import styles from '../styles';

type Props = {
  navigation: any,
};

export default class Settings extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'Settings',
    title: 'Settings',
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Settings
        </Text>
      </View>
    );
  }
}
