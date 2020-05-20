import {
  DELETE_STAR,
  POST_STAR,
  SET_STAR,
} from '../types';

const initialState = {
  stars: [],
  star: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STAR:
      return {
        ...state,
        star: action.payload
      };
    case DELETE_STAR:
      let index = state.stars.findIndex(
        star => star.starId === action.payload.starId
      );
      index = state.stars.findIndex(star => star.starId === action.payload);
      state.stars.splice(index, 1);
      return {
        ...state
      };
    case POST_STAR:
      return {
        ...state,
        stars: [action.payload, ...state.stars]
      };
    default:
      return state;
  }
}
