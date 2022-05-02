import { FETCH_ALL, FETCH_CUANTITY, FETCH_USER, START_LOADING, END_LOADING, UPDATE, DELETE } from '../constants/actionTypes';

export default (state = { isLoading: true, user: {id:"", Nombre:"", Apellido:"", Usuario:"", FechaNacimiento:null,Celular:"",Correo:"", Contraseña:""}, users: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true};
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        users: action.payload.data,
      };
    case FETCH_USER:
      localStorage.setItem('user', JSON.stringify({ ...action?.payload.data }))
      return { ...state, user: action.payload.data };
    case FETCH_CUANTITY:
      return { ...state.users.length};
    case UPDATE:
      localStorage.setItem('user', JSON.stringify({
        "_id": "",
        "Nombre": "",
        "Apellido": "",
        "Usuario": "",
        "Fecha_Nacimiento": "",
        "Celular": "",
        "Correo": "",
        "Contraseña": "",
        "__v": 0
      }))
      return { ...state, user: action.data };
    case DELETE:
      localStorage.setItem('user', JSON.stringify({
        "_id": "",
        "Nombre": "",
        "Apellido": "",
        "Usuario": "",
        "Fecha_Nacimiento": "",
        "Celular": "",
        "Correo": "",
        "Contraseña": "",
        "__v": 0
      }))
      return { ...state, user: {id:"", Nombre:"", Apellido:"", Usuario:"", FechaNacimiento:null,Celular:"",Correo:"", Contraseña:""}};
    default:
      return state;
  }
};