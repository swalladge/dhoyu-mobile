// @flow

import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import NavigationService from './NavigationService';

import * as API from './Api';
import { getRandomInt } from './Tools';

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
  USER_LOGOUT: 18,
  RETRIEVE_GAME_FAILED: 19,
  RETRIEVE_GAME_LOADING: 20,
  PLAY_GAME_READY: 21,
  SPARE_PIECE_PRESSED: 22,
  USED_PIECE_PRESSED: 23,
  COMPLETE_GAME: 24,
  RESET_CREATE_GAME: 25,
  CREATE_UPLOAD_PROGRESS: 26,
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

export const setToken = (token: string) => {
  // set the token in the api object
  API.setAPIToken(token);

  return {
    type: ACTIONS.SET_TOKEN,
    payload: {
      token,
    },
  };
};

const doLogin: (username: string, password: string, dispatch: (any) => void) => Promise<any> =
  (username, password, dispatch) =>
    API.getToken(username, password).then((data) => {
      const { token } = data;
      dispatch(setToken(token));

      // save details to storage for later
      AsyncStorage.setItem('loginDetails', JSON.stringify({
        username,
        password,
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
        payload: error,
      });
    });


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

    API.register(registerUsername, registerPassword).then((data) => {
      // register success, let's login!
      doLogin(registerUsername, registerPassword, dispatch).catch((error) => {
        dispatch({
          type: ACTIONS.REGISTER_INVALID,
          payload: error,
        });
      });
    }).catch((error) => {
      dispatch({
        type: ACTIONS.REGISTER_INVALID,
        payload: error,
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

    doLogin(loginUsername, loginPassword, dispatch);
  };
}

export function reHydrate(): any {
  return (dispatch) => {
    console.log('Attempting to retrieve login details from storage.');

    AsyncStorage.getItem('loginDetails').then((value) => {
      console.log('retrieval success');
      if (value && value.length) {
        const { username, password } = JSON.parse(value);
        doLogin(username, password, dispatch);
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
      dispatch({
        type: ACTIONS.PROFILE_FAILED,
        payload: error,
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

export function resetUploadGame(): any {
  return {
    type: ACTIONS.RESET_CREATE_GAME,
  };
}

export function createPublicSwitchChanged(value: boolean): any {
  return {
    type: ACTIONS.CREATE_PUBLIC_SWITCH_CHANGED,
    payload: value,
  };
}

export const uploadGame = () => (dispatch: (any) => void, getState: () => any) => {
  // to display loading icon, etc.
  // anything done by this should be reverted in CREATE_UPLOAD_COMPLETE and CREATE_UPLOAD_FAILED
  dispatch({
    type: ACTIONS.CREATE_UPLOAD_PROGRESS,
  });

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
      payload: error,
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
      payload: error,
    });
  });
};

export const logout = () => (dispatch: (any) => void, getState: () => any) => {
  // navigate back to the login screen
  NavigationService.dispatch(NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName: 'loginStack',
    }),
    ],
  }));

  // wipe the user data from state
  dispatch({
    type: ACTIONS.USER_LOGOUT,
  });
  API.removeAPIToken();
  AsyncStorage.clear();
};

export const playGame = (id: string) => (dispatch: (any) => void, getState: () => any) => {
  // const state = getState();
  dispatch({
    type: ACTIONS.RETRIEVE_GAME_LOADING,
  });

  // TODO: consider caching this: build up local data structure and check if key
  // there before network request
  API.retrieveGame(id).then((details) => {

    // api returns an array of strings, but we want an array of objects with IDs
    let simplePieces = details.pieces;
    let pieces = [];
    for (let i = 0, len = simplePieces.length; i < len; i++) {
      pieces.push({
        text: simplePieces[i],
        id: i,
      });
    }

    dispatch({
      type: ACTIONS.PLAY_GAME_READY,
      payload: {
        ...details,
        pieces
      },
    });

    NavigationService.navigate('PlayGame');
  }).catch((error) => {
    dispatch({
      type: ACTIONS.RETRIEVE_GAME_FAILED,
      payload: error,
    });
  });
};

export function sparePiecePressed(piece: any): any {
  return {
    type: ACTIONS.SPARE_PIECE_PRESSED,
    payload: piece,
  };
}

export function usedPiecePressed(piece: any): any {
  return {
    type: ACTIONS.USED_PIECE_PRESSED,
    payload: piece,
  };
}

export const finishGame = (game: any) => (dispatch: (any) => void, getState: () => any) => {
  // launch the action to reset the local current game state
  dispatch({
    type: ACTIONS.COMPLETE_GAME,
  });

  // navigate back to list of games
  NavigationService.navigate('FindGames');

  // only log the play if the game was complete
  if (game.complete) {
    // log the play
    API.logPlay(game.id).then((details) => {
      console.log(details);
    });
    // TODO: possibly a good idea to handle any errors from this axios Promise
  }
};

export const deleteGame = (id: string) => (dispatch: (any) => void, getState: () => any) => {
  API.deleteGame(id).then((details) => {
    dispatch(retrieveGamesList());
    // TODO: investigate this behaviour - should it reload the games list?
    // should it locally remove from state to avoid another api call? what if
    // the game was deleted from a page other than list of games?
  });
  // TODO: probably should catch an error here...
};
