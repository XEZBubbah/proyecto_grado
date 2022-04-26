import React, { useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Title from '../Title/Title';
import { getUsers } from '../../actions/users';

const UsersTable = () => {

    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
      dispatch(getUsers());
    },[]);

    const allUsers = useSelector((state)=>state.users.users);

    const handleEdit = (e,row) => {
      e.preventDefault();
      history(`/users/${row}`);
    }

    const columns = [
        { field: "_id", headerName: "id", headerAlign: 'center', align: 'center' , flex:'0,12', GridColDef: 'center'},
        { field: "Nombre", headerName: "Nombres", headerAlign: 'center', align: 'center', flex:'1',  GridColDef: 'center'},
        { field: "Apellido", headerName: "Apellidos", headerAlign: 'center', align: 'center', flex:'0,12', width: 180 },
        { field: "Usuario", headerName: "Usuario", headerAlign: 'center', align: 'center', flex:'0,12',width: 180 },
        { field: "Fecha_Nacimiento", headerName: "Fecha de Nacimiento", headerAlign: 'center', align: 'center', flex:'0,12',width: 200 },
        { field: "Correo", headerName: "Correo", headerAlign: 'center', align: 'center', flex:'0,12', width: 200 },
        {
          field: "Editar",
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
                  <EditIcon/>
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
      <Title>Usuarios</Title>
      <DataGrid 
        initialState={{
            sorting: {
            sortModel: [{ field: 'Nombre', sort: 'asc' }],
          },
        }}
        columns={columns}
        rows={allUsers}
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