// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { retrieveGamesList, playGame } from '../actions';

import styles from '../styles';

type Piece = {
  text: string,
  id: number,
};

type Props = {
  game: any,
  pieces: Array<Piece>,
  navigation: any,
};


const mapStateToProps = state => ({
  game: state.currentGame,
  pieces: state.currentGame.pieces,
});

const mapDispatchToProps = dispatch => ({
});


class PlayGame extends Component<Props> {
  // static navigationOptions = ({ navigation }: any) => ({
  //   title: 'Play!',
  // });

  render() {
    const game = this.props.game;

    // TODO: tile images when more than one
    const images = game.images.map(image => (
      <View style={{ height: 200, margin: 10 }} key={image.id}>
        <Image source={{ uri: image.data }} style={{ flex: 1 }} />
      </View>
    ));

    const pieces = this.props.pieces.map(piece => (
      <TouchableOpacity key={piece.id} onPress={() => {}}>
        <View elevation={2} style={styles.letterTile} >
          <Text>{piece.text}</Text>
        </View>
      </TouchableOpacity>
    ));

    return (
      <ScrollView>
      <View style={styles.infoPage}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('FindGames')} >
          <MaterialIcon name="close-circle-outline" size={40} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Playing game {game.id}</Text>

        {images}

        <Text>TODO</Text>

        <View style={styles.letterTilesWrapper}>
        {pieces}
        </View>

      </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
