// @flow
// This hack lets us access navigator actions from anywhere in the code, not
// just inside a component.

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  );
}

function dispatch(x: any) {
  _navigator.dispatch(x);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  dispatch,
  setTopLevelNavigator,
};

