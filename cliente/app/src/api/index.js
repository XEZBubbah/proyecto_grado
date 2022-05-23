import axios from  'axios';
const API = axios.create({baseURL: 'https://apiciclorrutas.herokuapp.com/'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

//users
export const fetchUserCuantity = () => API.post('/userA/fetchUserCuantity');
export const fetchAllUsers = () => API.post('userA/fetchAllUsers');
export const getUsers = () => API.get('userA/getUsers');
export const getUser = (id) => API.get(`userA/${id}`)
export const modifyUserMovile = (formData) => API.post('userA/modifyUserMovile', formData);
export const deleteUserAccountMovil = (Usuario) => API.post('userA/deleteUserAccountMovil', Usuario)
//admin
export const modifyUserInfoAdmin = (formData) => API.post('/userA/modifyUserInfoAdmin',formData);
export const modifyAdminPass = (formData) => API.post('/userA/modifyAdminPass',formData);
//reports
export const fetchAllReports = () => API.post('/reportA/fetchAllReports');
export const fetchReport = (id) => API.post(`/reportA/${id}`);
export const getReportsNuevos = () => API.get('/reportA/getReportsNuevos');
export const getReportsProceso = () => API.get('/reportA/getReportsProceso');
export const getReportsCompleto = () => API.get('/reportA/getReportsCompleto');
export const editReport = (formData) => API.put('/reportA/editReport', formData);
export const deleteReport = (id) => API.delete(`/reportA/deleteReport/${id}`);
//auth
export const signin = (formData) => API.post('/userA/signin', formData);
export const signup = (formData) => API.post('/userA/signup', formData);