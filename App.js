/**
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import { userReducer, profileReducer } from './reducers';

import NavigationService from './NavigationService';

import Home from './containers/Home';
import Settings from './containers/Settings';
import Register from './containers/Register';
import Login from './containers/Login';
import About from './containers/About';
import User from './containers/User';

import { reHydrate } from './actions';


const DrawerNav = DrawerNavigator(
  {
    User: {
      screen: User,
    },
    Home: {
      screen: Home,
    },
    Settings: {
      screen: Settings,
    },
    About: {
      screen: About,
    },
  // Add other screens to be in hamburger menu here.
  },
  {
    initialRouteName: 'Home',
  },
);


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
    initialRouteName: 'loginScreen',
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

const initialState = {
  user: {
    registerUsername: '',
    registerPassword: '',
    token: '',
    registerError: '',
    loginUsername: '',
    loginPassword: '',
    loginError: '',
    username: '',
    password: '',
  },
};


const store = createStore(
  combineReducers({
    user: userReducer,
    profile: profileReducer,
  }),
  initialState,
  applyMiddleware(thunk),
);

type Props = {
};

class App extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store,
    };
    // TODO: use this to show loading icon while logging in
  }

  componentWillMount() {
    this.state.store.dispatch(reHydrate());
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <RootNav ref={(navRef) => { NavigationService.setTopLevelNavigator(navRef); }} />
      </Provider>
    );
  }
}

export default App;

