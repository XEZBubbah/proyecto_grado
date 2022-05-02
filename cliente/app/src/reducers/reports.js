import { FETCH_ALL_REPORTS, FETCH_REPORT, UPDATE_REPORT, START_LOADING_REPORT, END_LOADING_REPORT, DELETE_REPORT} from '../constants/actionTypes';

export default (state = { isLoading: true,report:{id:"", Asunto:"", Estado:"", Descripcion:"",Fecha_Generado:"",Tipo_Reporte:"",UAppMov_Id:"", UAppMov_Usuario:""}, reports: [] }, action) => {
  switch (action.type) {
    case START_LOADING_REPORT:
      return { ...state, isLoading: true };
    case END_LOADING_REPORT:
      return { ...state, isLoading: false };
    case FETCH_ALL_REPORTS:
      return {
        ...state,
        reports: action.payload.data,
      };
    case FETCH_REPORT:
      localStorage.setItem('report', JSON.stringify({ ...action?.payload.data }))
      return { ...state, report: action.payload.data };
    case UPDATE_REPORT:
      localStorage.setItem('report', JSON.stringify({ ...action?.data }))
      return { ...state, report: action.data };
    case DELETE_REPORT:
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
      return {  ...state, report: {id:"", Asunto:"", Estado:"", Descripcion:"",Fecha_Generado:"",Tipo_Reporte:"",UAppMov_Id:"", UAppMov_Usuario:""}};
    default:
      return state;
  }
};