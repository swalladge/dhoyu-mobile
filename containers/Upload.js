// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
} from 'react-native';

import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles';
import { chooseCreateImage } from '../actions';

type LoadingState = 'loading' | 'failed' | 'ready';

type Props = {
  chooseImage: () => void,
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  chooseImage: () => {
    dispatch(chooseCreateImage());
  },
});


class Upload extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'Create',
    title: 'Create',
    drawerIcon: <MaterialIcon name="cloud-upload" size={20} />,
  });

  render() {
    return (
      <View style={styles.infoPage}>
        <Text style={styles.headerText}>Create Game</Text>
        <Text>
          TODO
        </Text>

        <Button
          title="Pick image"
          onPress={() => this.props.chooseImage()}
        />

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
