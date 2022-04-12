import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './input';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};


const Auth = () => {

    const [form, setForm] = useState(initialState);
    const [showPassword,setShowPassword] = useState(false);
    const classes = useStyles();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const dispatch = useDispatch();
    const history = useNavigate();


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(form,history))
        }else{
            dispatch(signin(form,history))
        }
        
    };
    
    const [isSignup, setIsSignup] = useState(false);
    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };

    return(
        
        <Box sx={{ display: 'flex' }}>
            <MuiAppBar position="absolute">
              <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
              >
                <Typography
                  component={Link} to="/home" 
                  variant="h3"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }} 
                >
                  BikeApp
                </Typography>
                <Button component={Link} to="/signin" variant="contained" color="primary">Iniciar Sesión</Button>
              </Toolbar>
            </MuiAppBar>
            <Container component="main" maxWidth="xs">
                <Paper className ={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography variant="h5">Iniciar Sesión</Typography> {/*Modificado*/}
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Input name="email" label="Correo Electrónico" handleChange={handleChange} type = "email"/>
                            <Input name="password" label="Contraseña" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Iniciar Sesión
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
        
    )
};

export default Auth;
