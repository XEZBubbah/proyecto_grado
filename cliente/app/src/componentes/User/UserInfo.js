import React, { useState, useEffect } from 'react';
import { useParams,useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Card, CardMedia, TextField,Button, Typography, Avatar, Paper, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import BikeAppCover from '../../images/BikeApp.png';
import {modifyUserMovile } from '../../actions/users';
import { getUser1 } from '../../actions/users';

const UserInfo = () => {
    const { isLoading } = useSelector((state)=>state.users);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const id = useParams();
    const initialState = { Nombre:user.Nombre, Apellido:user.Apellido, Correo:user.Correo, id:id.id, Usuario:user.Usuario, Celular:user.Celular, Fecha_Nacimiento:null};
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    const [editCamps, setEditCamps] = useState(false);

    const switchEdit = () => {
        setEditCamps((preveditCamps) => !preveditCamps);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        dispatch(modifyUserMovile(form,history));
    };

    const handleEditCamps = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    useEffect(() => {
        dispatch(getUser1(id.id));
    },[id])

    if (isLoading) {
        return(
            <Paper style={{ justifyContent: "center", display: "flex" }} sx={{height:'70vh'}}>
                <CircularProgress size="7em" />
            </Paper>
        );
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
                <Box style={{ justifyContent: "center", display: "flex" }} sx={{}}>              
                    <Avatar 
                        alt={user?.Nombre}
                        sx={{width: 90, height: 90, mb:0}}
                        style={{
                            border: '5px solid black'

                        }}
                    >
                            {user?.Nombre.charAt(0)}
                    </Avatar>                
                </Box>                      
                </Box>
                <Box style={{ justifyContent: "center", display: "flex" }} sx={{}}>
                    <Typography noWrap='true'><strong>{user?.Nombre} {user?.Apellido} / {user?.Usuario}</strong></Typography>
                    
                </Box>
                <Box style={{ justifyContent: "center", display: "flex" }} sx={{}}>
                    <Typography noWrap='true' variant="overline">Usuario</Typography>
                </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} sx={{mt:3}}>
                <Paper>
                    <Typography variant='h6' color='primary' sx={{ml:3, p:1}}><strong>Información</strong></Typography>
                    <Grid>
                        <Grid item xs={12} md={12} lg={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <form>
                                <Grid item xs={6} md={6} lg={6}>                                    
                                    <TextField
                                        disabled={!editCamps}
                                        required={editCamps}
                                        onChange={handleEditCamps}
                                        name="Correo" 
                                        id="outlined-required"
                                        label="Correo Electrónico"
                                        fullWidth
                                        defaultValue={user?.Correo}
                                        sx={{my:1}}
                                    >                                      
                                    </TextField>
                                    <TextField
                                        disabled={!editCamps}
                                        required={editCamps}
                                        onChange={handleEditCamps}
                                        name="Usuario" 
                                        id="outlined-required"
                                        label="Usuario"
                                        fullWidth
                                        defaultValue={user?.Usuario}
                                        sx={{my:1}}
                                    />
                                    <TextField
                                        disabled={!editCamps}
                                        required={editCamps}
                                        onChange={handleEditCamps}
                                        name="Nombre" 
                                        fullWidth
                                        id="outlined-required"
                                        label="Nombres"
                                        defaultValue={user?.Nombre}
                                        sx={{my:1}}
                                    >
                                    </TextField>
                                    <TextField
                                        disabled={!editCamps}
                                        required={editCamps}
                                        onChange={handleEditCamps}
                                        name="Apellido" 
                                        fullWidth
                                        id="outlined-required"
                                        label="Apellidos"
                                        defaultValue={user?.Apellido}
                                        sx={{my:1}}
                                    >                                  
                                    </TextField>
                                    <TextField
                                        disabled={!editCamps}
                                        required={editCamps}
                                        onChange={handleEditCamps}
                                        name="Celular" 
                                        id="outlined-required"
                                        label="Celular"
                                        fullWidth
                                        defaultValue={user?.Celular}
                                        sx={{my:1}}
                                    />                     
                                </Grid>
                                {!editCamps ? (
                                    <Box width={'100%'} style={{ justifyContent: "center", display: "flex" }}>
                                        <Button onClick={switchEdit}>Editar Campos</Button>
                                    </Box>                                   
                                ):(
                                    <Box width={'100%'} style={{ justifyContent: "center", display: "flex" }}>
                                        <Button onClick={submitEdit}>Cambiar Información</Button>
                                        <Button onClick={switchEdit}>Cancelar Cambios</Button>
                                    </Box> 
                                )}
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default UserInfo