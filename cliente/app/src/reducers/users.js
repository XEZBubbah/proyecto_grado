import { FETCH_ALL, FETCH_CUANTITY, FETCH_USER, START_LOADING, END_LOADING, UPDATE, DELETE } from '../constants/actionTypes';

export default (state = { isLoading: true, user: null, users: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        users: action.payload.data,
      };
    case FETCH_USER:
      return { ...state, user: action.payload.data };
    case FETCH_CUANTITY:
      return { ...state.users.length};
    case UPDATE:
      return {  };
    case DELETE:
      return {  };
    default:
      return state;
  }
};