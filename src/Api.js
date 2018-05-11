// @flow

import axios from 'axios';

import { getErrorMsg } from './Tools';

const API_ROOT: string = 'http://10.0.0.2:5000/api';
// export const API_ROOT: string = 'https://dhoyu.walladge.net/api';
// TODO: make this configurable in some config file

let _token: string = '';

export const setAPIToken = (token: string, expires: ?number) => {
  console.log('setting global token value in api');
  _token = token;
};

export const removeAPIToken = () => {
  _token = '';
};

export const getUserDetails = () => axios.get('/user', {
  baseURL: API_ROOT,
  headers: {
    Authorization: `Bearer ${_token}`,
  },
}).then(response => response.data).catch((error) => {
  throw getErrorMsg(error);
});


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
    Authorization: `Bearer ${_token}`,
  },
});

const getAxiosInst = () => axios.create({
  baseURL: API_ROOT,
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
