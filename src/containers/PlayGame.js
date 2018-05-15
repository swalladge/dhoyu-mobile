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

import { retrieveGamesList, playGame, sparePiecePressed, usedPiecePressed, finishGame } from '../actions';

import styles from '../styles';

type Piece = {
  text: string,
  id: number,
};

type Props = {
  game: any,
  pieces: Array<Piece>,
  navigation: any,
  sparePiecePressed: (Piece) => void,
  usedPiecePressed: (Piece) => void,
  finishGame: (string) => void,
};


const mapStateToProps = state => ({
  game: state.currentGame,
});

const mapDispatchToProps = dispatch => ({
  sparePiecePressed: (piece: Piece) => {
    dispatch(sparePiecePressed(piece));
  },
  usedPiecePressed: (piece: Piece) => {
    dispatch(usedPiecePressed(piece));
  },
  finishGame: (game: any) => {
    dispatch(finishGame(game));
  },
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

    const usedPieces = game.usedPieces.map(piece => (
      <TouchableOpacity key={piece.id} onPress={() => this.props.usedPiecePressed(piece)}>
        <View elevation={2} style={styles.letterTile} >
          <Text>{piece.text}</Text>
        </View>
      </TouchableOpacity>
    ));

    const pieces = game.pieces.map(piece => (
      <TouchableOpacity key={piece.id} onPress={() => this.props.sparePiecePressed(piece)}>
        <View elevation={2} style={styles.letterTile} >
          <Text>{piece.text}</Text>
        </View>
      </TouchableOpacity>
    ));

    let successOrUsedTiles;
    if (game.complete) {
      successOrUsedTiles = (
        <View>
        <View style={styles.letterTilesWrapper}>
          <Text style={styles.completeWord}>{game.word}</Text>
        </View>

        <TouchableOpacity onPress={() => this.props.finishGame(game)}>
          <Text>Finish! </Text>
          <MaterialIcon name="arrow-right-bold" size={40} />
        </TouchableOpacity>
        </View>
      );
    } else {
      successOrUsedTiles = (
        <View>
        <View style={styles.letterTilesWrapper}>
          {usedPieces}
        </View>

        <View style={styles.letterTilesWrapper}>
        {pieces}
        </View>
        </View>
      );
    }



    return (
      <ScrollView>
      <View style={styles.infoPage}>
        <TouchableOpacity onPress={() => this.props.finishGame(game)} >
          <MaterialIcon name="close-circle-outline" size={40} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Playing game {game.id}</Text>

        {images}

        {successOrUsedTiles}

      </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
