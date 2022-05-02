import {FETCH_ALL, FETCH_USER,UPDATE,FETCH_CUANTITY, START_LOADING, END_LOADING, DELETE} from '../constants/actionTypes';
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

export const getUser = (id,history) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const { data } = await api.getUser(id);
    dispatch({type: FETCH_USER, payload: data});
    dispatch({type: END_LOADING});
    history(0);
  }catch(error){
    console.log(error.message);
  }
}

export const getUser1 = (id) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const { data } = await api.getUser(id);
    dispatch({type: FETCH_USER, payload: data});
    dispatch({type: END_LOADING});
  }catch(error){
    console.log(error.message);
  }
}

export const modifyUserMovile = (formData, history) => async(dispatch) => {
  try{
      const { data } = await api.modifyUserMovile(formData);
      dispatch({type: UPDATE, data});
      history('/users');
  }catch(error){
      console.log(error);
  }
}

export const deleteUserAccountMovil = (Usuario,history) => async(dispatch) => {
  try{
    api.deleteUserAccountMovil(Usuario);
    dispatch({type:DELETE});
    history(0);
  }catch(error){
    console.log(error);
  }
}