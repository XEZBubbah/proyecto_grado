import axios from  'axios';
const API = axios.create({baseURL: 'http://localhost:5000/'});

export const signin = (formData) => API.post('/userA/signin', formData);
export const signup = (formData) => API.post('/userA/signup', formData);
export const fetchusercuantity = () => API.post('/userA/fetchUserCuantity');
export const fetchAllUsers = () => API.post('userA/fetchAllUsers');