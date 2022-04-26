import {UPDATE_REPORT, FETCH_ALL_REPORTS, FETCH_REPORT, START_LOADING_REPORT, END_LOADING_REPORT} from '../constants/actionTypes';
import * as api from '../api/index.js';
  
export const getReports = () => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING_REPORT });
    const { data: { data } } = await api.fetchAllReports();
    dispatch({ type: FETCH_ALL_REPORTS, payload: { data } });
    dispatch({ type: END_LOADING_REPORT });
  }catch(error){
    console.log(error.message)
  }
}

export const getReport = (id) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING_REPORT });
    const { data } = await api.fetchReport(id);
    console.log(data);
    dispatch({type: FETCH_REPORT, payload: data})
    dispatch({type: END_LOADING_REPORT });
  }catch(error){
    console.log(error.message);
  }
}
