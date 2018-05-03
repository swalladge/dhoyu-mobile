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
