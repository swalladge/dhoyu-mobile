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

export const uploadGameToAPI = (gameData: UploadGameData) => {
  console.log('uploadGameToAPI(', gameData);
  // using any to shut flow up when using as arg to FormData.append - https://github.com/facebook/react-native/issues/13187
  // https://stackoverflow.com/questions/48858804/flow-call-of-method-append-error-with-object-literal
  const data: any = {
    word: gameData.word,
    public: gameData.public,
  };

  const body = new FormData();

  for (const image of gameData.images) {
    const imageData: any = {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    };
    body.append('images[]', imageData);
  }

  body.append('data', JSON.stringify(data));

  return axios.post(
    '/games',
    body,
    {
      baseURL: API_ROOT,
      headers: {
        Authorization: `Bearer ${_token}`,
      },
      timeout: 1000,
    },
  ).then(response => response.data);
};
