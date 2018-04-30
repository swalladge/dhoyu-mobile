// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
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


class Home extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'Home',
    title: 'Dhoyu',
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Play!
        </Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
