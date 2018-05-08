// @flow

import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import NavigationService from './NavigationService';

import * as API from './Api';

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
  CREATE_IMAGE_CHOSEN: 10,
  CREATE_WORD_CHANGED: 11,
  CREATE_PUBLIC_SWITCH_CHANGED: 12,
  CREATE_UPLOAD_COMPLETE: 13,
  CREATE_UPLOAD_FAILED: 14,
  GAMES_LIST_LOADING: 15,
  GAMES_LIST_LOADED: 16,
  GAMES_LIST_LOAD_FAIL: 17,
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
  API.setAPIToken(token, expires);

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
        // TODO: refactor this to within the API module
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
    API.getUserDetails().then((details) => {
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

export const imageChosen = (data: any) => ({
  type: ACTIONS.CREATE_IMAGE_CHOSEN,
  payload: data,
});


export function chooseCreateImage(): any {
  return (dispatch, getState) => {
    const images = getState().create.images || [];
    if (images.length >= 4) {
      // max images reached
      // TODO: display message
      return;
    }
    ImagePicker.showImagePicker({
      title: 'Select image to add to game',
      mediaType: 'photo',
    }, (response: any) => {
      console.log('image picker response', response);

      if (response.didCancel) {
        // ignore
      } else if (response.error) {
        console.log('Error: ', response.error);
        // TODO: display message to user
      } else {
        // here is where you could validate max image file sizes, etc.
        dispatch(imageChosen({
          uri: response.uri,
          type: response.type,
          fileSize: response.fileSize,
          fileName: response.fileName,
          data: response.data,
        }));
      }
    });
  };
}

export function createWordChanged(text: string): any {
  return {
    type: ACTIONS.CREATE_WORD_CHANGED,
    payload: text,
  };
}

export function createPublicSwitchChanged(value: boolean): any {
  return {
    type: ACTIONS.CREATE_PUBLIC_SWITCH_CHANGED,
    payload: value,
  };
}

export const uploadGame = () => (dispatch: (any) => void, getState: () => any) => {
  const state = getState();

  // TODO: check for blank/invalid data

  API.uploadGame({
    images: state.create.images || [],
    word: state.create.word || '',
    public: state.create.isPublic || false,
  }).then((details) => {
    // navigate back to home screen for now
    NavigationService.navigate('Home');
    dispatch({
      type: ACTIONS.CREATE_UPLOAD_COMPLETE,
      // TODO: this would probably contain link/id for new game - handle appropriately
      payload: details,
    });
  }).catch((error) => {
    dispatch({
      type: ACTIONS.CREATE_UPLOAD_FAILED,
      payload: getErrorMsg(error),
    });
  });
};


export const retrieveGamesList = () => (dispatch: (any) => void, getState: () => any) => {

  API.retrieveGamesList().then((details) => {
    dispatch({
      type: ACTIONS.GAMES_LIST_LOADED,
      payload: details.games,
    });
  }).catch((error) => {
    dispatch({
      type: ACTIONS.GAMES_LIST_LOAD_FAIL,
      payload: getErrorMsg(error),
    });
  });
};
