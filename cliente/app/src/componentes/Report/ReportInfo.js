import React, { useState, useEffect } from 'react';
import { useParams,useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Card, CardMedia, TextField,Button, Typography, Avatar, Paper, CircularProgress, Chip,Select, MenuItem, ButtonGroup } from '@mui/material';
import Grid from '@mui/material/Grid';
import BikeAppCover from '../../images/BikeApp.png';
import MyTheme from './MyTheme';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EastIcon from '@mui/icons-material/East';
import { getReport1, editarReport } from '../../actions/reports';

const UserInfo = () => {
    const { isLoading } = useSelector((state)=>state.reports);
    const [report, setReport] = useState(JSON.parse(localStorage.getItem('report')));
    const ide = useParams();
    const initialState = {id:ide.id,Estado:report.Estado};
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();


    const submitNuevo = (e) => {
        const newState = ({id:ide.id,Estado:"N"});
        setForm(newState);
        dispatch(editarReport({Report_Id:ide.id,Estado:"N"},history));
    };

    const submitProceso = (e) => {
        const newState = ({id:ide.id,Estado:"P"});
        setForm(newState);
        dispatch(editarReport({Report_Id:ide.id,Estado:"P"},history));
    };

    const submitFinalizado = (e) => {
        const newState = ({id:ide.id,Estado:"F"});
        setForm(newState);
        dispatch(editarReport({Report_Id:ide.id,Estado:"F"},history));
    };

    const handleEditCamps = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    useEffect(() => {
        dispatch(getReport1(ide.id));
    },[ide])

    if (isLoading) {
        return(
            <Paper style={{ justifyContent: "center", display: "flex" }} sx={{height:'70vh'}}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    const chip = (A) => {
        if(A==="P"){
            return(
                <Chip sx={{ border: 1, borderColor: MyTheme.palette.Pendiente }} icon={<AutorenewIcon style={MyTheme.palette.Pendiente} />} label="En proceso" style={MyTheme.palette.Pendiente} variant="outlined"/>
            )
        }
        if(A==="N"){
            return(
                <Chip size="big" sx={{ border: 1, borderColor: MyTheme.palette.Nuevo, mr:2}} icon={<EastIcon style={MyTheme.palette.Nuevo}/> } label="Nuevo" style={MyTheme.palette.Nuevo} variant="outlined"/>
                )
        }
        if(A==="F"){
            return(
                <Chip sx={{ border: 1, borderColor: MyTheme.palette.Finalizado}} icon={<CheckIcon style={MyTheme.palette.Finalizado} />} label="Finalizado" style={MyTheme.palette.Finalizado} variant="outlined"/>
            )
        }
        return(
            "asdad"        
        )
    }

    return (
        <Grid sx={{height:'70hv'}}>
            <Grid item xs={12} md={4} lg={12} sx={{}}>
                <Paper>
                <Card sx={{width:'100%'}}>
                    <CardMedia
                        component="img"
                        image={BikeAppCover}
                    />
                </Card>           
                <Box  sx={{mt: 0, mb:0}}>
                    <Grid container spacing={1} sx={{mt:2}}>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="h4" sx={{ml:2}}><strong>{report.Asunto}</strong></Typography>
                            <Typography variant="overline" sx={{ml:2}}>Enviado por: {report.UAppMov_Usuario}</Typography>
                            <Typography variant="h4" sx={{ml:2}}></Typography>
                            <Typography variant="overline" sx={{ml:2}}>Tipo de reporte: {report.Tipo_Reporte}</Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} container justifyContent="flex-end">
                            {chip(report.Estado)}
                        </Grid>
                    </Grid>           
                </Box>               
                </Paper>
            </Grid>
            <Grid  sx={{mt:3}}>
                <Paper
                 sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}>
                    <Typography variant='h6' color='primary' sx={{ml:3, p:2}}><strong>Información</strong></Typography>
                    <Grid item xs={12} md={12} lg={12} sx={{width:'100%'}}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                height: "100%",
                                width:"100%"
                            }}
                        >
                            <Typography variant='body1' paragraph={true}  component="body1" sx={{ml:3, flexGrow:1}}>{report.Descripcion}</Typography>
                        </Paper>  
                    </Grid>
                    <Box sx={{my:2}} textAlign="center">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={submitNuevo}>Establecer Nuevo</Button>
                            <Button onClick={submitProceso}>Establecer en Proceso</Button>
                            <Button onClick={submitFinalizado}>Establecer Finalizado</Button>
                        </ButtonGroup>
                    </Box>                 
                </Paper>
            </Grid>
        </Grid>
    )
}

export default UserInfo