import { AUTH, UPDATE_ADMIN, UPDATE_PASS_ADMIN, SET } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const modifyUserInfoAdmin = (formData, history) => async(dispatch) => {
    try{
        const { data } = await api.modifyUserInfoAdmin(formData);
        dispatch({type:UPDATE_ADMIN, data});
        history(0);
    }catch(error){
        console.log(error);
    }
}

export const modifyAdminPass = (formData,history) => async(dispatch) => {
    try{
        const { data } = await api.modifyAdminPass(formData);
        dispatch({type:UPDATE_PASS_ADMIN, data});
        history(0);
    }catch(error){
        console.log(error);
    }
}

export const signin = (formData, history) => async(dispatch) => {
    try {
        const { data } = await api.signin(formData);
        dispatch({type: AUTH, data});
        dispatch({type: SET});
        history(0);
        history('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async(dispatch) => {
    try {
        const { data } = await api.signup(formData);
        dispatch({type: AUTH, data});
        history('/');
    } catch (error) {
        console.log(error);
    }
}

