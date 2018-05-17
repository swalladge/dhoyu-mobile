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

import { retrieveGamesList, playGame, deleteGame } from '../actions';

import styles from '../styles';

type Props = {
  games: Array<any>,
  ready: boolean,
  playGameLoading: boolean,
  loadGames: () => void,
  playGame: (string) => void,
  deleteGame: (string) => void,
};


const mapStateToProps = state => ({
  games: state.gamesList.games || [],
  ready: state.gamesList.ready || false,
  playGameLoading: state.gamesList.playGameLoading || false,
});

const mapDispatchToProps = dispatch => ({
  loadGames: () => {
    dispatch(retrieveGamesList());
  },
  playGame: (id: string) => {
    dispatch(playGame(id));
  },
  deleteGame: (id: string) => {
    dispatch(deleteGame(id));
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
    const games = this.props.games.map(game => {
      let deleteButton;
      if (game.can_delete) {
        // TODO: styling
        deleteButton = (<TouchableOpacity onPress={() => this.props.deleteGame(game.id)}>
          <MaterialIcon name="close-circle-outline" size={20} />
        </TouchableOpacity>);
      }
      return (
        <TouchableOpacity key={game.id} onPress={() => this.props.playGame(game.id)}>
          <View elevation={5} style={styles.gameInList}>
            <Text>{game.word}</Text>
            {deleteButton}
          </View>
        </TouchableOpacity>
      );
    });

    let loadingInfo;
    if (!this.props.ready) {
      loadingInfo = (
        <Text>Loading...</Text>
      );
    }

    let playGameLoading;
    if (this.props.playGameLoading) {
      playGameLoading = (
        <MaterialIcon name="loading" size={40} />
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

          {playGameLoading}

          {games}

        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindGames);
