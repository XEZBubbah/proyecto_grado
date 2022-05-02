import * as actionTypes from '../constants/actionTypes';

const authReducer = (state ={authData:null} , action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return {...state, authData: action?.data};

        case actionTypes.LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        case actionTypes.UPDATE_ADMIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data}
        case actionTypes.UPDATE_PASS_ADMIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state,authData: action?.data}
        case actionTypes.SET:
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
            localStorage.setItem('report', JSON.stringify({
                "_id": "",
                "Asunto": "",
                "Estado": "",
                "Descripcion": "",
                "Fecha_Generado": "",
                "Tipo_Reporte": "",
                "UAppMov_Id": "",
                "UAppMov_Usuario": "",
                "__v": 0
            }))
            return { ...state,authData: action?.data}
        default:
            return state;
    }
};

export default authReducer;