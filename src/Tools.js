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

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export const getRandomInt = (min: number, max: number): number => (
    Math.floor(Math.random() * (max - min + 1)) + min
);
