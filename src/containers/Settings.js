// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles';

type Props = {
  navigation: any,
};

export default class Settings extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'Settings',
    title: 'Settings',
    drawerIcon: <MaterialIcon name='settings' size={20} />,
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Settings
        </Text>
      </View>
    );
  }
}
