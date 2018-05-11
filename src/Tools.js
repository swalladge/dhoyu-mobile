import jwtDecode from 'jwt-decode';

export const isValidToken = (token) => {
  const decoded = jwtDecode(token);
  return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};

// TODO: function here to check if token expired using exp field if necessary

// get a pretty error message given an axios `error` instance
export const getErrorMsg: (any) => string = (error) => {
  console.log(error);
  if (error.response) {
    return `${error.response.status} | request failed`;
  } else if (error.request) {
    return `No response from server | ${error.request}`;
  }
  // Something happened in setting up the request that triggered an Error
  return error.message;
};
