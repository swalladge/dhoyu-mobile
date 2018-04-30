// @flow


import { ACTIONS } from '../actions';

const initialUserState = {
  registerUsername: '',
  registerPassword: '',
  token: '',
  token_expires: 0,
  registerError: '',
};

export const userReducer = (state: any = initialUserState, action: any) => {
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
        tokenExpires: action.payload.expires,
        registerError: '',
      };
    }

    case ACTIONS.REGISTER_INVALID: {
      return {
        ...state,
        registerError: action.payload,
      };
    }

    default: return state;
  }
};
