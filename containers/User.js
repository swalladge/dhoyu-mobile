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
import { refreshProfile } from '../actions';

type LoadingState = 'loading' | 'failed' | 'ready';

type Props = {
  navigation: any,
  state: LoadingState,
  refresh: () => void,
  gamesCreated: number,
  gamesPlayed: number,
  isAdmin: string,
  username: string,
  learnerScore: number,
  creatorScore: number,
  error: string,
};


const mapStateToProps = state => ({
  state: state.profile.state || 'loading',
  error: state.profile.error || '',
  username: state.profile.username || '',
  isAdmin: (state.profile.isAdmin || false) ? 'yes' : 'no',
  gamesPlayed: state.profile.gamesPlayed || 0,
  gamesCreated: state.profile.gamesCreated || 0,
  learnerScore: state.profile.learnerScore || 0,
  creatorScore: state.profile.creatorScore || 0,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => {
    dispatch(refreshProfile());
  },
});


class User extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => ({
    drawerLabel: 'My Profile',
    title: 'My Profile',
    drawerIcon: <MaterialIcon name="account-circle" size={20} />,
  });

  componentWillMount() {
    this.props.refresh();
  }

  render() {
    switch (this.props.state) {
      case 'loading': {
        return (
          <View style={styles.infoPage}>
            <Text style={styles.headerText}>My Profile</Text>
            <Text>
              Loading
            </Text>
          </View>
        );
      }

      case 'failed': {
        return (
          <View style={styles.infoPage}>
            <Text style={styles.headerText}>My Profile</Text>
            <Text>
              Failed to load profile info
            </Text>
            <Text>
              {this.props.error}
            </Text>
          </View>
        );
      }

      case 'ready': {
        return (
          <View style={styles.infoPage}>
            <Text style={styles.headerText}>{this.props.username}</Text>
            <Text>
              Admin: {this.props.isAdmin}
            </Text>
            <Text>
              Games played: {this.props.gamesPlayed}
            </Text>
            <Text>
              Games created: {this.props.gamesCreated}
            </Text>
            <Text>
              score (learner): {this.props.learnerScore}
            </Text>
            <Text>
              score (creator): {this.props.creatorScore}
            </Text>
          </View>
        );
      }

      default: {
        return (
          <View style={styles.infoPage}>
            <Text style={styles.headerText}>My Profile</Text>
            <Text>
              SOMETHING FAILED
            </Text>
            <Text>
              Invalid state: {this.props.state}
            </Text>
          </View>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
