// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';

import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    drawerLabel: 'Play',
    title: 'Play',
    drawerIcon: <MaterialIcon name="play" size={20} />,
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Play!
        </Text>

        <Button
          title="Find games"
          onPress={() => this.props.navigation.navigate('FindGames')}
        />

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
