// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  Dimensions,
  Switch,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles';
import { chooseCreateImage, createWordChanged, createPublicSwitchChanged, uploadGame, resetUploadGame } from '../actions';

type Props = {
  chooseImage: () => void,
  images: [any],
  word: string,
  wordChanged: (string) => void,
  switchChanged: (boolean) => void,
  uploadGame: () => void,
  reset: () => void,
  isPublic: boolean,
  error: string,
  uploadDisabled: boolean,
};


const mapStateToProps = state => ({
  images: state.create.images || [],
  isPublic: state.create.isPublic || false,
  error: state.create.error || '',
  word: state.create.word || '',
  uploadInProgress: state.create.uploadInProgress,
});

const mapDispatchToProps = dispatch => ({
  chooseImage: () => {
    dispatch(chooseCreateImage());
  },
  wordChanged: (text: string) => {
    dispatch(createWordChanged(text));
  },
  switchChanged: (value: boolean) => {
    dispatch(createPublicSwitchChanged(value));
  },
  uploadGame: () => {
    dispatch(uploadGame());
  },
  reset: () => {
    dispatch(resetUploadGame());
  },
});


class Upload extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'Create',
    title: 'Create',
    drawerIcon: <MaterialIcon name="cloud-upload" size={20} />,
  });

  // TODO: need two way data binding for word text input?

  render() {
    // const windowWidth = Dimensions.get('window').width;

    const imageElements = this.props.images.map(image => (
      <View style={{ height: 200, margin: 10 }} key={image.uri}>
        <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
      </View>
    ));

    let error;
    if (this.props.error.length > 0) {
      error = <Text>{this.props.error}</Text>;
    }

    let uploadBtn;
    if (this.props.uploadInProgress) {
      uploadBtn = <Text>Uploading...</Text>;
    } else {
      uploadBtn = (
          <Button
            title="Upload!"
            onPress={() => this.props.uploadGame()}
          />
      );
    }

    return (
      <ScrollView>
        <View style={styles.infoPage}>
          <Text style={styles.headerText}>Create Game</Text>

          {error}

          <TextInput
            style={{ width: '100%' }}
            placeholder="word"
            value={this.props.word}
            onChangeText={text => this.props.wordChanged(text)}
          />

          <View>
            <Text>Share game publicly?</Text>
            <Switch
              onValueChange={value => this.props.switchChanged(value)}
              value={this.props.isPublic}
            />
          </View>

          <View style={styles.verticalPadded}>
          <Button
            title="Add image"
            onPress={() => this.props.chooseImage()}
          />
          </View>

          {imageElements}

          <View style={styles.verticalPadded}>
            {uploadBtn}
          </View>

          <View style={styles.verticalPadded}>
          <Button
            title="Reset"
            color="#EE1111"
            onPress={() => this.props.reset()}
          />
          </View>



        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
