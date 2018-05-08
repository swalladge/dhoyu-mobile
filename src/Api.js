// @flow

import axios from 'axios';

const API_ROOT: string = 'http://10.0.0.2:5000/api';

let _token: string = '';

export const setAPIToken = (token: string, expires: ?number) => {
  console.log('setting global token value in api');
  _token = token;
};

export const getUserDetails = () => axios.get('/user', {
  baseURL: API_ROOT,
  headers: {
    Authorization: `Bearer ${_token}`,
  },
  timeout: 1000,
}).then(response => response.data);


type UploadGameData = {
  images: Array<any>,
  word: string,
  public: boolean,
};


// NOTE: future work will include selecting language; at the moment it's just
// hard coded
export const uploadGame = (gameData: UploadGameData) => {
  console.log('uploadGameToAPI(', gameData);

  const data = {
    word: gameData.word,
    public: gameData.public,
    language: 'rop', // kriol language code
    images: gameData.images.map(image => ({
      data: image.data,
    })),
    audio: null,
  };

  return axios.post(
    '/games',
    data,
    {
      baseURL: API_ROOT,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      timeout: 1000,
    },
  ).then(response => response.data);
};


export const retrieveGamesList = () => {
  console.log('retrieving games list');
  return axios.get(
    '/games',
    {
      baseURL: API_ROOT,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      timeout: 1000,
    },
  ).then(response => response.data);
};
