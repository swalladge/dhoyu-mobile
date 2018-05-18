// @flow

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

    case ACTIONS.USER_LOGOUT: {
      return {
        ...state,
        registerUsername: '',
        registerPassword: '',
        token: '',
        registerError: '',
        loginUsername: '',
        loginPassword: '',
        loginError: '',
        username: '',
        password: '',
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
        gamePlays: action.payload.n_plays,
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
        // reset the state because it was successful - no need to keep locally
        images: [],
        word: '',
        isPublic: false,
        uploadInProgress: false,
      };
    }

    case ACTIONS.RESET_CREATE_GAME: {
      return {
        ...state,
        // reset the state
        images: [],
        word: '',
        isPublic: false,
      };
    }

    case ACTIONS.CREATE_UPLOAD_FAILED: {
      return {
        ...state,
        error: action.payload,
        uploadInProgress: false,
      };
    }

    case ACTIONS.CREATE_UPLOAD_PROGRESS: {
      return {
        ...state,
        uploadInProgress: true,
      };
    }

    default: return state;
  }
};


export const gamesListReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case ACTIONS.GAMES_LIST_LOADED: {
      return {
        ...state,
        ready: true,
        games: action.payload,
      };
    }

    case ACTIONS.GAMES_LIST_LOADING: {
      return {
        ...state,
        ready: false,
        games: [],
      };
    }


    case ACTIONS.RETRIEVE_GAME_LOADING: {
      return {
        ...state,
        playGameLoading: true,
      };
    }

    case ACTIONS.RETRIEVE_GAME_FAILED: {
      return {
        ...state,
        playGameLoading: false,
        errorMsg: action.payload, // TODO: use this error message
      };
    }

    case ACTIONS.PLAY_GAME_READY: {
      return {
        ...state,
        playGameLoading: false,
      };
    }

    default: return state;
  }
};


export const currentGameReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case ACTIONS.PLAY_GAME_READY: {
      return {
        ...state,
        id: action.payload.id,
        author: action.payload.author,
        public: action.payload.public,
        word: action.payload.word,
        language: action.payload.language,
        images: action.payload.images,
        pieces: action.payload.pieces,
        usedPieces: [],
        complete: false,
      }
    }

    case ACTIONS.SPARE_PIECE_PRESSED: {
      if (state.complete) {
        return state;
      }

      const pressedPiece = action.payload;
      const usedPieces = [...state.usedPieces, pressedPiece];
      const complete = usedPieces.map(piece => piece.text).join('') === state.word;

      return {
        ...state,
        pieces: state.pieces.filter(piece => piece.id !== pressedPiece.id),
        usedPieces: usedPieces,
        complete: complete,
      }
    }

    case ACTIONS.USED_PIECE_PRESSED: {
      if (state.complete) {
        return state;
      }

      const pressedPiece = action.payload;

      return {
        ...state,
        usedPieces: state.usedPieces.filter(piece => piece.id !== pressedPiece.id),
        pieces: [...state.pieces, pressedPiece],
      }
    }

    case ACTIONS.COMPLETE_GAME: {
      return {
        ...state,
        id: 0,
        author: 'none',
        public: false,
        word: 'none',
        language: 'none',
        images: [],
        pieces: [],
        usedPieces: [],
        complete: false,
      }
    }

    default: return state;
  }
};
