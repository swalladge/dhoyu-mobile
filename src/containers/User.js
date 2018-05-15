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
import { refreshProfile, logout } from '../actions';

type LoadingState = 'loading' | 'failed' | 'ready';

type Props = {
  navigation: any,
  state: LoadingState,
  refresh: () => void,
  gamesCreated: number,
  gamePlays: number,
  isAdmin: string,
  username: string,
  learnerScore: number,
  creatorScore: number,
  error: string,
  logout: () => void,
};


const mapStateToProps = state => ({
  state: state.profile.state || 'loading',
  error: state.profile.error || '',
  username: state.profile.username || '',
  isAdmin: (state.profile.isAdmin || false) ? 'yes' : 'no',
  gamePlays: state.profile.gamePlays || 0,
  gamesCreated: state.profile.gamesCreated || 0,
  learnerScore: state.profile.learnerScore || 0,
  creatorScore: state.profile.creatorScore || 0,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => {
    dispatch(refreshProfile());
  },
  logout: () => {
    dispatch(logout());
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

  getUserJSX() {
    switch (this.props.state) {
      case 'loading': {
        return (
          <Text>
            Loading
          </Text>
        );
      }

      case 'failed': {
        return [
          <Text>
            Failed to load profile info
          </Text>,
          <Text>
            {this.props.error}
          </Text>,
        ];
      }

      case 'ready': {
        return (
          <View>
            <Text>
            username: {this.props.username}
            </Text>
            <Text>
            Admin: {this.props.isAdmin}
            </Text>
            <Text>
            Number of plays: {this.props.gamePlays}
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
        return [
          <Text>
            SOMETHING FAILED
          </Text>,
          <Text>
            Invalid state: {this.props.state}
          </Text>,
        ];
      }
    }
  }


  render() {
    return (
      <View style={styles.infoPage}>
        <Text style={styles.headerText}>My Profile</Text>

        {this.getUserJSX()}

        <Button
          title="Logout"
          onPress={() => this.props.logout()}
        />

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
