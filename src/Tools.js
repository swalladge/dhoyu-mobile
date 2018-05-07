import jwtDecode from 'jwt-decode';

export const isValidToken = (token) => {
  let decoded = jwtDecode(token);
  return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};
