import React, { useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import Title from './Title';
import { Box  } from '@mui/system';
import { getUsers } from '../../../actions/users';


function RecentUsers() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers());
  })
  const users = useSelector((state)=>state.users.users);

  const columns = [
    { field: "_id", headerName: "Id", headerAlign: 'center', flex:'0,16', align: 'center', width: 120 },
    { field: "Nombre", headerName: "Nombres", headerAlign: 'center', flex:'1', align: 'center'},
    { field: "Apellido", headerName: "Apellidos", headerAlign: 'center', flex:'0,16', width: 200, align: 'center'},
    { field: "Usuario", headerName: "Usuario", headerAlign: 'center', flex:'0,16',width: 200, align: 'center'},
    { field: "Fecha_Nacimiento", headerName: "Fecha de Nacimiento", headerAlign: 'center', flex:'0,16',width: 170, align: 'center'},
    { field: "Correo", headerName: "Correo", headerAlign: 'center', flex:'0,16',width: 180, align: 'center'}
  ];

  return (
    <Box sx={{height: 300}}>
      <Title>Nuevos Usuarios</Title>
      <DataGrid 
        initialState={{
            sorting: {
            sortModel: [{ field: '_id', sort: 'desc' }],
          },
        }}
        columns={columns}
        rows={users}
        pageSize={5}
        rowsPerPageOptions={[3]}
        getRowId={(row) => row._id}
        sx={{height:'80%'}}
      >
      </DataGrid>
      <Typography
        component={Link} to="/Users" 
        variant="subtitle1"
        color="primary"
        noWrap
      >
        Todos los usuarios
      </Typography>
    </Box>
  );
}

export default function RUsers() {
  return <RecentUsers/>;
}