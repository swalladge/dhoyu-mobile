// @flow

import { AsyncStorage } from 'react-native';

import { ACTIONS } from '../actions';

export const userReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case ACTIONS.REGISTER_USERNAME_CHANGED: {
      return {
        ...state,
        registerUsername: action.payload,
        registerError: '',
      };
    }

    case ACTIONS.REGISTER_PASSWORD_CHANGED: {
      return {
        ...state,
        registerPassword: action.payload,
        registerError: '',
      };
    }

    case ACTIONS.SET_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
        registerError: '',
      };
    }

    case ACTIONS.REGISTER_INVALID: {
      return {
        ...state,
        registerError: action.payload,
      };
    }

    case ACTIONS.LOGIN_USERNAME_CHANGED: {
      return {
        ...state,
        loginUsername: action.payload,
        loginError: '',
      };
    }

    case ACTIONS.LOGIN_PASSWORD_CHANGED: {
      return {
        ...state,
        loginPassword: action.payload,
        loginError: '',
      };
    }

    case ACTIONS.LOGIN_INVALID: {
      return {
        ...state,
        loginError: action.payload,
      };
    }

    // case ACTIONS.SET_LOGIN_DETAILS: {
    //   return {
    //     ...state,
    //     username: action.payload.username,
    //     password: action.payload.password,
    //   };
    // }



    default: return state;
  }
};
