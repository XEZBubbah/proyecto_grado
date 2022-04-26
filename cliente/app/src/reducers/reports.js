import { FETCH_ALL_REPORTS, FETCH_REPORT, UPDATE_REPORT, START_LOADING_REPORT, END_LOADING_REPORT} from '../constants/actionTypes';

export default (state = { isLoading: true,report:null, reports: [] }, action) => {
  switch (action.type) {
    case START_LOADING_REPORT:
      return { ...state, isLoading: true };
    case END_LOADING_REPORT:
      return { ...state, isLoading: false };
    case FETCH_ALL_REPORTS:
      return {
        ...state,
        reports: action.payload.data,
      };
    case FETCH_REPORT:
      return { ...state, report: action.payload.data };
    case UPDATE_REPORT:
      return {  };
    default:
      return state;
  }
};