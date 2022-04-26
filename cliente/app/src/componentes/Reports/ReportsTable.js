import React, { useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Title from '../Title/Title';
import MyTheme from './MyTheme';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EastIcon from '@mui/icons-material/East';
import { getReports } from '../../actions/reports';

const UsersTable = () => {

    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
      dispatch(getReports());
    },[]);

    const allReports = useSelector((state)=>state.reports.reports)

    const handleEdit = (e,row) => {
      e.preventDefault();
      history(`/reports/${row}`);
    }

    const columns = [
        { field: "_id", headerName: "id", headerAlign: 'center', align: 'center' , flex:'0,12', GridColDef: 'center'},
        { field: "UAppMov_Usuario", headerName: "Usuario", headerAlign: 'center', align: 'center', flex:'1',  GridColDef: 'center', width: 100},
        { field: "Tipo_Reporte", headerName: "Tipo de Reporte", headerAlign: 'center', align: 'center', flex:'0,12', width: 150 },
        { field: "Asunto", headerName: "Asunto", headerAlign: 'center', align: 'center', flex:'0,12',width: 180 },
        { field: "Descripcion", headerName: "Descripción", headerAlign: 'center', align: 'center', flex:'0,12',width: 250 },
        { 
            field: "Estado", headerName: "Estado", headerAlign: 'center', align: 'center', flex:'0,12', width: 200,
            renderCell: (cellValues) =>{
                if(cellValues.row.Estado==="P"){
                    return(
                        <Chip sx={{ border: 1, borderColor: MyTheme.palette.Pendiente }} icon={<AutorenewIcon style={MyTheme.palette.Pendiente} />} label="En proceso" style={MyTheme.palette.Pendiente} variant="outlined"/>
                    )
                }else if(cellValues.row.Estado==="N"){
                    return(
                        <Chip sx={{ border: 1, borderColor: MyTheme.palette.Nuevo }} icon={<EastIcon style={MyTheme.palette.Nuevo}/> } label="Nuevo" style={MyTheme.palette.Nuevo} variant="outlined"/>
                    )
                }else if(cellValues.row.Estado==="F"){
                    return(
                        <Chip sx={{ border: 1, borderColor: MyTheme.palette.Finalizado }} icon={<CheckIcon style={MyTheme.palette.Finalizado} />} label="Finalizado" style={MyTheme.palette.Finalizado} variant="outlined"/>
                    )
                }
            }

        },
        {
          field: "Ver",
          headerAlign: 'center', align: 'center', flex:'0,12',
          renderCell: (cellValues) => {
            return (
                <IconButton
                  color="inherit" 
                  sx={{ mr: 1, ml:3}}
                  onClick={(event,row) => {
                    handleEdit(event,cellValues.row._id);
                  }}
                >
                  <VisibilityIcon/>
                </IconButton>
            );
          }
        },
        {
          field: "Eliminar",
          headerAlign: 'center', align: 'center', flex:'0,12',
          renderCell: () => {
            return (
              <IconButton
                  color="inherit" 
                  sx={{ mr:1, ml:3}}
                >
                <DeleteIcon/>
              </IconButton>
            );
          }
        }
      ]; 


  return (
    <Box sx={{height: 550}}>
      <Title>Reportes</Title>
      <DataGrid 
        initialState={{
            sorting: {
            sortModel: [{ field: '_id', sort: 'desc' }],
          },
        }}
        columns={columns}
        rows={allReports}
        pageSize={7}
        rowsPerPageOptions={[3]}
        getRowId={(row) => row._id}
        sx={{height:'90%'}}
      >
      </DataGrid>
    </Box>
  )
}

export default UsersTable