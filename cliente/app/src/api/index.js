import axios from  'axios';
const API = axios.create({baseURL: 'https://apiciclorrutas.herokuapp.com/'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchUserCuantity = () => API.post('/userA/fetchUserCuantity');
export const fetchAllUsers = () => API.post('userA/fetchAllUsers');
export const getUsers = () => API.get('userA/getUsers');
export const getUser = (id) => API.get(`userA/${id}`)

export const signin = (formData) => API.post('/userA/signin', formData);
export const signup = (formData) => API.post('/userA/signup', formData);