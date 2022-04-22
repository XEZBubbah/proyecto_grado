import React, { useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import Title from './Title';
import { Box } from '@mui/system';
import { getUsers } from '../../../actions/users';

// Generate Order Data



function RecentUsers() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers());
  })
  const users = useSelector((state)=>state.users.users);

  const columns = [
    { field: "_id", headerName: "id", headerAlign: 'center', width: 150 },
    { field: "Nombre", headerName: "Nombres", headerAlign: 'center', width: 150 },
    { field: "Apellido", headerName: "Apellidos", headerAlign: 'center', width: 150 },
    { field: "Usuario", headerName: "Usuario", headerAlign: 'center', width: 150 },
    { field: "Fecha_Nacimiento", headerName: "Fecha de Nacimiento", headerAlign: 'center', width: 180 },
    { field: "Correo", headerName: "Correo", headerAlign: 'center', width: 150 }
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