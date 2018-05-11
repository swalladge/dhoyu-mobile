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
import { chooseCreateImage, createWordChanged, createPublicSwitchChanged, uploadGame } from '../actions';

type Props = {
  chooseImage: () => void,
  images: [any],
  wordChanged: (string) => void,
  switchChanged: (boolean) => void,
  uploadGame: () => void,
  isPublic: boolean,
  error: string,
};


const mapStateToProps = state => ({
  images: state.create.images || [],
  isPublic: state.create.isPublic || false,
  error: state.create.error || '',
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
});


class Upload extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'Create',
    title: 'Create',
    drawerIcon: <MaterialIcon name="cloud-upload" size={20} />,
  });

  // TODO: reset state on upload or reset action
  // also need two way data binding for word text input?

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

    // TODO: disable upload button after upload action send to avoid bounce
    return (
      <ScrollView>
        <View style={styles.infoPage}>
          <Text style={styles.headerText}>Create Game</Text>

          {error}

          <TextInput
            style={{ width: '100%' }}
            placeholder="word"
            onChangeText={text => this.props.wordChanged(text)}
          />

          <View>
            <Text>Share game publicly?</Text>
            <Switch
              onValueChange={value => this.props.switchChanged(value)}
              value={this.props.isPublic}
            />
          </View>

          <Button
            title="Add image"
            onPress={() => this.props.chooseImage()}
          />

          {imageElements}

          <Button
            title="Upload!"
            onPress={() => this.props.uploadGame()}
          />


        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
