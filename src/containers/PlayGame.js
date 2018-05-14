// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { retrieveGamesList, playGame } from '../actions';

import styles from '../styles';

type Props = {
  game: any,
};


const mapStateToProps = state => ({
  game: state.currentGame,
});

const mapDispatchToProps = dispatch => ({
});


class PlayGame extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    title: 'Play!',
  });

  render() {
    const game = this.props.game;
    return (
      <View style={styles.infoPage}>
        <Text style={styles.headerText}>Play game {game.id}</Text>

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
