// @flow

import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';

import NavigationService from './NavigationService';

import { setAPIToken, getUserDetails } from './Api';

export const ACTIONS = {
  REGISTER_USERNAME_CHANGED: 0,
  REGISTER_PASSWORD_CHANGED: 1,
  REGISTER_INVALID: 2,
  SET_TOKEN: 3,
  LOGIN_USERNAME_CHANGED: 4,
  LOGIN_PASSWORD_CHANGED: 5,
  LOGIN_INVALID: 6,
  REFRESH_PROFILE: 7,
  PROFILE_READY: 8,
  PROFILE_FAILED: 9,
};

export function registerUsernameChanged(text: string): any {
  return {
    type: ACTIONS.REGISTER_USERNAME_CHANGED,
    payload: text,
  };
}

export function registerPasswordChanged(text: string): any {
  return {
    type: ACTIONS.REGISTER_PASSWORD_CHANGED,
    payload: text,
  };
}

export const setToken = (token: string, expires: number) => {
  // set the token in the api object
  setAPIToken(token, expires);

  return {
    type: ACTIONS.SET_TOKEN,
    payload: {
      token,
      expires,
    },
  };
};


// get a pretty error message given an axios `error` instance
const getErrorMsg = (error) => {
  console.log(error);
  if (error.response) {
    return `${error.response.status} | request failed`;
  } else if (error.request) {
    return `No response from server | ${error.request}`;
  }
  // Something happened in setting up the request that triggered an Error
  return error.message;
};


export function registerAction(): any {
  return (dispatch, getState) => {
    // get the variables and validate
    console.log('registering!');
    const { registerUsername, registerPassword } = getState().user;
    if (registerUsername.length === 0 || registerPassword.length === 0) {
      dispatch({
        type: ACTIONS.REGISTER_INVALID,
        payload: 'must fill in username and password',
      });
      return;
    }

    // actually do the thing
    axios.post('http://10.0.0.2:5000/api/register', {
      username: registerUsername,
      password: registerPassword,
    }).then((response) => {
      // register success, let's login!
      axios.post('http://10.0.0.2:5000/api/token', {
        username: registerUsername,
        password: registerPassword,
      }).then((response_) => {
        const { token, expires } = response_.data;
        dispatch(setToken(token, expires));

        // save details to storage for later
        AsyncStorage.setItem('loginDetails', JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }));

        // navigate to the home screen now we're logged in
        // also remove the rest of the history - don't want to go back to
        // register/login screens
        NavigationService.dispatch(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName: 'drawerStack',
          }),
          ],
        }));
      }).catch((error) => {
        dispatch({
          type: ACTIONS.REGISTER_INVALID,
          payload: getErrorMsg(error),
        });
      });
    }).catch((error) => {
      dispatch({
        type: ACTIONS.REGISTER_INVALID,
        payload: getErrorMsg(error),
      });
    });
  };
}

// Login screen actions

export function loginUsernameChanged(text: string): any {
  return {
    type: ACTIONS.LOGIN_USERNAME_CHANGED,
    payload: text,
  };
}

export function loginPasswordChanged(text: string): any {
  return {
    type: ACTIONS.LOGIN_PASSWORD_CHANGED,
    payload: text,
  };
}


export function loginAction(): any {
  return (dispatch, getState) => {
    // get the variables and validate
    const { loginUsername, loginPassword } = getState().user;
    if (loginUsername.length === 0 || loginPassword.length === 0) {
      dispatch({
        type: ACTIONS.LOGIN_INVALID,
        payload: 'must fill in username and password',
      });
      return;
    }

    // actually do the thing
    axios.post('http://10.0.0.2:5000/api/token', {
      username: loginUsername,
      password: loginPassword,
    }).then((response_) => {
      const { token, expires } = response_.data;
      dispatch(setToken(token, expires));

      // save details to storage for later
      AsyncStorage.setItem('loginDetails', JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }));

      // navigate to the home screen now we're logged in
      // also remove the rest of the history - don't want to go back to
      // register/login screens
      NavigationService.dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({
          type: NavigationActions.NAVIGATE,
          routeName: 'drawerStack',
        }),
        ],
      }));
    }).catch((error) => {
      dispatch({
        type: ACTIONS.LOGIN_INVALID,
        payload: getErrorMsg(error),
      });
    });
  };
}

export function reHydrate(): any {
  return (dispatch) => {
    console.log('Attempting to retrieve login details from storage.');

    AsyncStorage.getItem('loginDetails').then((value) => {
      console.log('retrieval success');
      if (value && value.length) {
        const details = JSON.parse(value);
        console.log(details);

        // dispatch(setLoginDetails(details));


        // actually login to the api
        axios.post('http://10.0.0.2:5000/api/token', {
          username: details.username,
          password: details.password,
        }).then((response) => {
          const { token, expires } = response.data;
          dispatch(setToken(token, expires));

          // navigate to the home screen now we're logged in
          // also remove the rest of the history - don't want to go back to
          // register/login screens
          NavigationService.dispatch(NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({
              type: NavigationActions.NAVIGATE,
              routeName: 'drawerStack',
            }),
            ],
          }));
        }).catch((error) => {
          dispatch({
            type: ACTIONS.LOGIN_INVALID,
            payload: getErrorMsg(error),
          });
        });
      } else {
        console.log('No saved details found.');
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}


export function refreshProfile(): any {
  return (dispatch) => {
    // alert the program that we've started loading
    dispatch({
      type: ACTIONS.REFRESH_PROFILE,
    });

    // load user details
    getUserDetails().then((details) => {
      dispatch({
        type: ACTIONS.PROFILE_READY,
        payload: details,
      });
    }).catch((error) => {
      console.log(error);
      dispatch({
        type: ACTIONS.PROFILE_FAILED,
        payload: getErrorMsg(error),
      });
    });
  };
}

