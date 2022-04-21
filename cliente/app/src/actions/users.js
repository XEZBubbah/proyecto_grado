import {FETCH_ALL, FETCH_USER, FETCH_CUANTITY} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const fetchUserCuantity = () => async(dispatch) =>{
    try {
        const {data} = await api.fetchUserCuantity();
        dispatch({ type: FETCH_CUANTITY, payload: data })
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
  
export const fetchUserInfoMovil = (username) => async (dispatch) => {
  try{
    const { data } = await api.fetchUserInfoMovil(username);
    dispatch({type: FETCH_USER, payload: data})
  }catch(error){
    console.log(error.message);
  }
}
