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

    default: return state;
  }
};


export const profileReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case ACTIONS.REFRESH_PROFILE: {
      return {
        ...state,
        state: 'loading',
      };
    }

    case ACTIONS.PROFILE_READY: {
      return {
        ...state,
        state: 'ready',
        username: action.payload.username,
        isAdmin: action.payload.is_admin,
        gamesPlayed: action.payload.games_played,
        gamesCreated: action.payload.games_created,
        learnerScore: action.payload.learner_score,
        creatorScore: action.payload.creator_score,
        // and anything else required... such as likes/votes in future
      };
    }

    case ACTIONS.PROFILE_FAILED: {
      return {
        ...state,
        state: 'failed',
        error: action.payload,
      };
    }

    default: return state;
  }
};

export const uploadReducer = (state: any = {}, action: any) => {
  switch (action.type) {

    case ACTIONS.CREATE_IMAGE_CHOSEN: {
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    }

    case ACTIONS.CREATE_WORD_CHANGED: {
      return {
        ...state,
        word: action.payload,
      };
    }

    case ACTIONS.CREATE_PUBLIC_SWITCH_CHANGED: {
      return {
        ...state,
        isPublic: action.payload,
      };
    }

    case ACTIONS.CREATE_UPLOAD_COMPLETE: {
      return {
        ...state,
      };
    }

    case ACTIONS.CREATE_UPLOAD_FAILED: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: return state;
  }
};
