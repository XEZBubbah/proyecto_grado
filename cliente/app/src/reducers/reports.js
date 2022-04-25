import { FETCH_ALL_REPORTS, FETCH_REPORT, UPDATE_REPORT } from '../constants/actionTypes';

export default (state = { isLoading: true, users: [] }, action) => {
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
      return { ...state, user: action.payload.user };
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