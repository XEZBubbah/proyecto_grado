import React, { useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Title from '../../Title/Title';
import { Box  } from '@mui/system';
import { getReportsNuevos, getReportsCompleto, getReportsProceso} from '../../../api';

function ResumeReports(){

  const dispatch = useDispatch();
  const [reportesN, setReportesN] = useState(0);
  const [reportesP, setReportesP] = useState(0);
  const [reportesF, setReportesF] = useState(0);

  useEffect(()=>{
    getReportsNuevos().then((response) =>{
      setReportesN(response.data);
    })
    getReportsProceso().then((response) =>{
      setReportesP(response.data);
    })
    getReportsCompleto().then((response) =>{
      setReportesF(response.data);
    })
  })

  const columns = [
    { field: "RN", headerName:"Reportes Nuevos", headerAlign:"center", align:"center", flex:'0,3', width:300,},
    { field: "RP", headerName:"Reportes en Proceso", headerAlign:"center", align:"center", flex:'1',width:300,},
    { field: "RC", headerName:"Reportes Completos", headerAlign:"center", align:"center", flex:'0,3', width:300,}
  ];

  const rows = [
    { id:1 , RN:reportesN, RP:reportesP, RC: reportesF}
  ];

  return(
    <Box sx={{height: 300}}>
      <Title>Reportes totales</Title>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={1}
        sx={{height:'70%'}}
        hideFooter={true}
      >
      </DataGrid>
      <Typography
        component={Link} to="/Reports" 
        variant="subtitle1"
        color="primary"
        noWrap
      >
        Todos los reportes
      </Typography>
    </Box>
  )
}

export default function RReports() {
    return <ResumeReports/>;
  }