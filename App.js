/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import { StackNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';

import reducers, { initialState } from './reducers';
import styles from './styles';

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk),
);

class Home extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Home',
    title: 'Home page',
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            Welcome to React Native!
        </Text>
        <Text style={styles.welcome}>
            HOME SCREEN
        </Text>
        <Button
          title="another screen"
          onPress={() => this.props.navigation.navigate('Another')}
        />
      </View>
    );
  }
}

class Another extends Component<Props> {
  static navigationOptions = {
    drawerLabel: 'Another',
    title: 'Another random page',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            Another page...
        </Text>
      </View>
    );
  }
}


const DrawerNav = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Another: {
    screen: Another,
  },
});

const RootNav = StackNavigator(
  {
    drawer: {
      screen: DrawerNav,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'green' },
      headerLeft: <Text onPress={() => navigation.navigate('DrawerToggle')}>Menu</Text>,
    }),
  },
);


type Props = any;

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    );
  }
}
