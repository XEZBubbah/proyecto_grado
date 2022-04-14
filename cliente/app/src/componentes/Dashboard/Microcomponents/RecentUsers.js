import React, { useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { fetchAllUsers } from '../../../api';

// Generate Order Data



function RecentUsers() {

  
  const [usuarios, setUsuarios] = useState(0);

  useEffect(() => {
    fetchAllUsers().then((response) => {
      setUsuarios(response.data);
    })
  }, []);

  const columns = [
    { field: "_id", headerName: "id", width: 150 },
    { field: "Nombre", headerName: "Nombre", width: 150 },
    { field: "Apellido", headerName: "Apellido", width: 150 },
    { field: "Usuario", headerName: "Usuario", width: 150 },
    { field: "Fecha_Nacimiento", headerName: "Fecha de Nacimiento", width: 150 },
    { field: "Correo", headerName: "Correo", width: 150 }
  ];

  return (
    <Grid>
      <Title>Nuevos Usuarios</Title>
      <DataGrid 
        rows={usuarios}
        pageSize={15}
        getRowId={(row) => row._id}
        columns={columns}>
      </DataGrid>
      <Typography
        component={Link} to="/home" 
        variant="subtitle1"
        color="primary"
        noWrap
        sx={{ flexGrow: 1, mt:1}} 
      >
        Todos los usuarios
      </Typography>
    </Grid>
  );
}

export default function RUsers() {
  return <RecentUsers/>;
}