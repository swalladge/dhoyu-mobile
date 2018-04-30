/**
 * @flow
 */

import React from 'react';
import {
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import { userReducer } from './reducers';

import NavigationService from './NavigationService';

import Home from './containers/Home';
import Settings from './containers/Settings';
import Register from './containers/Register';
import Login from './containers/Login';


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
const MainNav = StackNavigator(
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

const LoginStack = StackNavigator(
  {
    registerScreen: {
      screen: Register,
    },
    loginScreen: {
      screen: Login,
    },
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: { backgroundColor: '#E73536' },
      title: 'You are not logged in',
      headerTintColor: 'white',
    },
    initialRouteName: 'registerScreen',
  },
);


const RootNav = StackNavigator({
  loginStack: {
    screen: LoginStack,
  },
  drawerStack: {
    screen: MainNav,
  },
}, {
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
});


const store = createStore(
  combineReducers({
    user: userReducer,
  }),
  applyMiddleware(thunk),
);


const App = () => (
  <Provider store={store}>
    <RootNav ref={(navRef) => { NavigationService.setTopLevelNavigator(navRef); }}/>
  </Provider>
);

export default App;

