import {FETCH_ALL} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const fetchusercuantity = () => async(dispatch) =>{
    try {
        const {data} = await api.fetchusercuantity();
        dispatch({ type: FETCH_ALL, payload: data })
    } catch(error){
        console.log(error);
    }
}

export const fetchAllUsers = () => async (dispatch) => {
    try {
      const { data } = await api.fetchAllUsers();
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  