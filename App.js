/**
 * @flow
 */

import React from 'react';
import {
  BackHandler,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import { StackNavigator, DrawerNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { userReducer } from './reducers';
import styles from './styles';

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


const initialNavState = RootNav.router.getStateForAction(RootNav.router.getActionForPathAndParams('loginStack'));
const navReducer = (state = initialNavState, action) => {
  const nextState = RootNav.router.getStateForAction(action, state);
  return nextState || state;
};

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');

const store = createStore(
  combineReducers({
    user: userReducer,
    nav: navReducer,
  }),
  applyMiddleware(navMiddleware, thunk),
);


class AppNavigation extends React.Component {
    componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    console.log(nav);
    dispatch(NavigationActions.back());
    return true;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return <RootNav navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })}
      />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(AppNavigation);

const App = () => (
  <Provider store={store}>
    <AppWithNavigationState/>
  </Provider>
);

export default App;

