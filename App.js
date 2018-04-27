/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { StackNavigator, DrawerNavigator } from 'react-navigation';

import reducers, { initialState } from './reducers';
import styles from './styles';

import Home from './containers/Home';
import Settings from './containers/Settings';


const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk),
);

const DrawerNav = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
  // Add other screens to be in hamburger menu here.
});


// main root navigator - contains the drawer navigator and header to show the
// hamburger menu icon
const RootNav = StackNavigator(
  {
    drawer: {
      screen: DrawerNav,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'orange' },
      headerLeft: <View margin={10}><Icon name="bars" size={30} onPress={() => navigation.navigate('DrawerToggle')} /></View>,
    }),
  },
);

const App = () => (
  <Provider store={store}>
    <RootNav />
  </Provider>
);

export default App;
