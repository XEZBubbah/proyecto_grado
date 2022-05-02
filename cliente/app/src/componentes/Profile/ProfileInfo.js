import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Badge, Card, CardMedia, TextField,InputAdornment, IconButton} from '@mui/material';
import Paper from '@mui/material/Paper';
import BikeAppCover from '../../images/BikeApp.png';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { modifyAdminPass, modifyUserInfoAdmin } from '../../actions/auth';



const ProfileInfo = () => {

const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
const initialState = { Nombre:user.result.Nombre, Apellido:user.result.Apellido, Correo:user.result.Correo, id:user.result._id};
const passState = { id:user.result._id,Contraseña:"", ContraseñaNueva:"", CContraseñaNueva:"" };
const [form, setForm] = useState(initialState);
const [passform, setPassForm] = useState(passState);
const dispatch = useDispatch();
const history = useNavigate();
const location = useLocation();
const [showPassword,setShowPassword] = useState(false);
const [showPassword1,setShowPassword1] = useState(false);
const [showPassword2,setShowPassword2] = useState(false);
const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
const handleShowPassword1 = () => setShowPassword1((prevShowPassword1) => !prevShowPassword1);
const handleShowPassword2 = () => setShowPassword2((prevShowPassword2) => !prevShowPassword2);
const [editCamps, setEditCamps] = useState(false);
const [editPassword, setEditPassword] = useState(false);

const switchEdit = () => {
    setEditCamps((preveditCamps) => !preveditCamps);
};

const switchEditPass = () => {
    setEditPassword((preveditPassword) => !preveditPassword);
}

const submitEdit = (e) => {
    e.preventDefault();
        dispatch(modifyUserInfoAdmin(form,history));
};

const submitEditPass = (e) => {
    e.preventDefault();
        dispatch(modifyAdminPass(passform,history));
}

const handleEditCamps = (e) => setForm({ ...form, [e.target.name]: e.target.value });
const handleEditPassw = (e) => setPassForm({...passform, [e.target.name]: e.target.value});

useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
},[location])



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
                    alt={user?.result.nombre}
                    sx={{width: 90, height: 90, mb:0}}
                    style={{
                        border: '5px solid black'

                     }}
                >
                        {user?.result.Nombre.charAt(0)}
                </Avatar>                
            </Box>                      
            </Box>
            <Box style={{ justifyContent: "center", display: "flex" }} sx={{}}>
                <Typography noWrap='true'><strong>{user?.result.Nombre} {user?.result.Apellido}</strong></Typography>
                
            </Box>
            <Box style={{ justifyContent: "center", display: "flex" }} sx={{}}>
                <Typography noWrap='true' variant="overline">Administrador/a</Typography>
            </Box>
            </Paper>
        </Grid>
        <Grid item xs={12} md={8} sx={{mt:3}}>
            <Paper>
                <Typography variant='h6' color='primary' sx={{ml:3, p:1}}><strong>Información</strong></Typography>
                <Grid>
                    <Grid item xs={12} md={6} lg={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 275,
                    }}
                    >
                        <form>
                            <Grid>
                                <TextField
                                    disabled={!editCamps}
                                    required={editCamps}
                                    onChange={handleEditCamps}
                                    name="Correo" 
                                    id="outlined-required"
                                    label="Correo Electrónico"
                                    fullWidth
                                    defaultValue={user?.result.Correo}
                                    sx={{my:1}}
                                >
                                </TextField>
                                <TextField
                                    disabled={!editCamps}
                                    required={editCamps}
                                    onChange={handleEditCamps}
                                    name="Nombre" 
                                    fullWidth
                                    id="outlined-required"
                                    label="Nombres"
                                    defaultValue={user?.result.Nombre}
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
                                    defaultValue={user?.result.Apellido}
                                    sx={{my:1}}
                                >                                  
                                </TextField>
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
                            </Grid>
                        </form>
                    </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 275,
                    }}
                    >
                        <form> 
                            {editPassword ? (
                              <Grid>{/*ACTIVADO PARA EDITAR*/}
                                <TextField
                                    required
                                    name="Contraseña" 
                                    fullWidth                                   
                                    onChange={handleEditPassw}
                                    id="outlined-required"
                                    label="Contraseña Actual"
                                    type={showPassword ? ("text"): ("password")}
                                    sx={{my:1}}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end" >
                                            <IconButton onClick={handleShowPassword}>
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    }}
                                />

                                <TextField
                                    required
                                    name="ContraseñaNueva" 
                                    fullWidth
                                    id="outlined-required"
                                    label="Nueva Contraseña"
                                    onChange={handleEditPassw}
                                    type={showPassword1 ? ("text"): ("password")}
                                    sx={{my:1}}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end" >
                                            <IconButton onClick={handleShowPassword1}>
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    }}
                                />

                                <TextField
                                    required
                                    name="CContraseñaNueva" 
                                    fullWidth
                                    id="outlined-required"
                                    label="Confirmar Nueva Contraseña"
                                    type={showPassword2 ? ("text"): ("password")}
                                    onChange={handleEditPassw}
                                    sx={{my:1}}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end" >
                                            <IconButton onClick={handleShowPassword2}>
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    }} 
                                />
                                {!editPassword ? (
                                    <Box width={'100%'} style={{ justifyContent: "center", display: "flex" }}>
                                        <Button onClick={switchEditPass}>Cambiar Contraseña</Button>
                                    </Box>                                   
                                ):(
                                    <Box width={'100%'} style={{ justifyContent: "center", display: "flex" }}>
                                        <Button onClick={submitEditPass}>Cambiar Contraseña</Button>
                                        <Button onClick={switchEditPass}>Cancelar Cambios</Button>
                                    </Box> 
                                )}
                              </Grid>  
                            ):( 
                              <Grid>{/*DESACTIVADO PARA EDITAR*/}
                                <TextField
                                    disabled
                                    name="Contraseña" 
                                    fullWidth
                                    id="outlined-required"
                                    label="Contraseña Actual"
                                    sx={{my:1}} 
                                    
                                />
                                <TextField
                                    disabled
                                    name="ContraseñaNueva" 
                                    fullWidth
                                    id="outlined-required"
                                    label="Confirmar Nueva Contraseña"
                                    sx={{my:1}}  
                                />
                                <TextField
                                    disabled
                                    name="CContraseñaNueva" 
                                    fullWidth
                                    id="outlined-required"
                                    label="Confirmar Nueva Contraseña"
                                    sx={{my:1}}  
                                />
                                
                                {!editPassword ? (
                                    <Box width={'100%'} style={{ justifyContent: "center", display: "flex" }}>
                                        <Button onClick={switchEditPass}>Cambiar Contraseña</Button>
                                    </Box>                                   
                                ):(
                                    <Box width={'100%'} style={{ justifyContent: "center", display: "flex" }}>
                                        <Button onClick={submitEditPass}>Cambiar Contraseña</Button>
                                        <Button onClick={switchEditPass}>Cancelar Cambios</Button>
                                    </Box> 
                                )}
                              </Grid>
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

export default ProfileInfo