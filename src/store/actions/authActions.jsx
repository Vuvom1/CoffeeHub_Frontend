import { jwtDecode } from 'jwt-decode';

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST'
});

export const loginSuccess = (token) => {
  const user = jwtDecode(token);
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  console.log(user)

  console.log('user', user);
  return {
    type: 'LOGIN_SUCCESS',
    payload: { token, user }
  };
};

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    type: 'LOGOUT'
  };
};
