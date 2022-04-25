import axios from  'axios';
const API = axios.create({baseURL: 'http://localhost:5000/'});

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
//reports
export const fetchAllReports = () => API.post('/reportA/fetchAllReports');
export const getReportsNuevos = () => API.get('/reportA/getReportsNuevos');
export const getReportsProceso = () => API.get('/reportA/getReportsProceso');
export const getReportsCompleto = () => API.get('/reportA/getReportsCompleto');
//auth
export const signin = (formData) => API.post('/userA/signin', formData);
export const signup = (formData) => API.post('/userA/signup', formData);