// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
// import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { retrieveGamesList } from '../actions';

import styles from '../styles';

type Props = {
  games: Array<any>,
  ready: boolean,
  loadGames: () => void,
};


const mapStateToProps = state => ({
  games: state.gamesList.games || [],
  ready: state.gamesList.ready || false,
});

const mapDispatchToProps = dispatch => ({
  loadGames: () => {
    dispatch(retrieveGamesList());
  },
});


class FindGames extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    // drawerLabel: 'Create',
    title: 'Find Games',
    // drawerIcon: <MaterialIcon name="cloud-upload" size={20} />,
  });

  componentWillMount() {
    this.props.loadGames();
  }

  render() {
    const games = this.props.games.map(game => (
      <View elevation={5} style={styles.gameInList} key={game.id}>
        <Text>{game.word}</Text>
      </View>
    ));

    let loadingInfo;
    if (!this.props.ready) {
      loadingInfo = (
        <Text>Loading...</Text>
      );
    }

    return (
      <ScrollView>
        <View style={styles.infoPage}>
          <Text style={styles.headerText}>Find Games</Text>

          <Text>List of all games available.</Text>

          <Button
            title="Refresh"
            onPress={() => this.props.loadGames()}
          />


          {loadingInfo}

          {games}

        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindGames);
