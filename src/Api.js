// @flow

import axios from 'axios';
import Config from 'react-native-config';

import { getErrorMsg } from './Tools';

const { API_ROOT } = Config;

let token: string = '';

export const setAPIToken = (token_: string) => {
  console.log('setting global token value in api');
  token = token_;
};

export const removeAPIToken = () => {
  token = '';
};

type UploadGameData = {
  images: Array<any>,
  word: string,
  public: boolean,
};

// functions to build an instance of axios with the required config (including
// authorization header)
const getAxiosAuthedInst = () => axios.create({
  baseURL: API_ROOT,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getAxiosInst = () => axios.create({
  baseURL: API_ROOT,
});

export const getUserDetails = () => getAxiosAuthedInst()
  .get('/user')
  .then(response => response.data).catch((error) => {
    throw getErrorMsg(error);
  });

// NOTE: future work will include selecting language; at the moment it's just
// hard coded
export const uploadGame = (gameData: UploadGameData) => {
  const data = {
    word: gameData.word,
    public: gameData.public,
    language: 'rop', // kriol language code
    images: gameData.images.map(image => ({
      data: image.data,
    })),
    audio: null,
  };

  return getAxiosAuthedInst().post(
    '/games',
    data,
  ).then(response => response.data).catch((error) => {
    throw getErrorMsg(error);
  });
};

export const retrieveGamesList = () => {
  console.log('retrieving games list');
  return getAxiosAuthedInst().get('/games').then(response => response.data).catch((error) => {
    throw getErrorMsg(error);
  });
};

export const register = (username: string, password: string) => getAxiosInst().post(
  '/register',
  {
    username,
    password,
  },
).then(response => response.data).catch((error) => {
  throw getErrorMsg(error);
});

export const getToken = (username: string, password: string) => getAxiosInst().post(
  '/token',
  {
    username,
    password,
  },
).then(response => response.data).catch((error) => {
  throw getErrorMsg(error);
});

export const retrieveGame = (id: string) => {
  console.log(`retrieving game ${id}`);
  return getAxiosAuthedInst().get(`/games/${id}`).then(response => response.data).catch((error) => {
    throw getErrorMsg(error);
  });
};

// `id` is a game id
export const logPlay = (id: string) => {
  const data = {
    id: id,
  };

  return getAxiosAuthedInst().post(
    '/play',
    data,
  ).then(response => response.data).catch((error) => {
    throw getErrorMsg(error);
  });
};
