import 'dotenv/config';
import {
  SET_STARS,
  LOADING_DATA,
  DELETE_STAR,
  SET_ERRORS,
  POST_STAR,
  CLEAR_ERRORS,
  LOADING_UI,
} from '../types';
import axios from 'axios';

// Get all stars
export const getStars = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('http://localhost:3000/api/star')
    .then(res => {
      // console.log('The stars:', res.data);
      dispatch({
        type: SET_STARS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: SET_STARS,
        payload: [],
      });
    });
};

// Post a star
export const addStar = newStar => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .star('/star', newStar)
    .then(res => {
      dispatch({
        type: POST_STAR,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.errors,
      });
    });
};

export const updateStar = (starId, updateData) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .put(`http://localhost:3000/api/star/${starId}`, updateData)
    .then(res => {
      console.log('message:', res.data)
      dispatch({
        type: POST_STAR,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.log('erro:', err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.errors,
      });
    });
};

export const deleteStar = starId => dispatch => {
  axios
    .delete(`http://localhost:3000/api/star/${starId}`)
    .then(() => {
      dispatch({ type: DELETE_STAR, payload: starId });
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
