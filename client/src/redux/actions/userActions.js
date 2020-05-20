import 'dotenv/config';
import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
} from '../types';
import axios from 'axios';

// const { REACT_APP_URL_API } = process.env;

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('http://localhost:3000/api/user/signin', userData)
    .then(res => {
      setAuthorization(res.data.User.token);
      dispatch({ type: CLEAR_ERRORS });
      history.push('/dashboard'); //redirect to the home page
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    });
};

export const setAuthorization = token => {
  const applicationToken = `Bearer ${token}`;
  localStorage.setItem('applicationToken', applicationToken);
  axios.defaults.headers.common['Authorization'] = applicationToken;
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('applicationToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};
