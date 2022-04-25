import {FETCH_ALL, FETCH_USER, FETCH_CUANTITY, START_LOADING, END_LOADING} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const fetchUserCuantity = () => async(dispatch) =>{
    try {
        const {data} = await api.fetchUserCuantity();
        dispatch({ type: FETCH_CUANTITY, payload: data })
    } catch(error){
        console.log(error);
    }
}
  
export const getUsers = () => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.getUsers();
    dispatch({ type: FETCH_ALL, payload: { data } });
    dispatch({ type: END_LOADING });
  }catch(error){
    console.log(error.message)
  }
}

export const getUser = (id) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const { data } = await api.getUser(id);
    dispatch({type: FETCH_USER, payload: data})
    dispatch({type: END_LOADING});
  }catch(error){
    console.log(error.message);
  }
}
