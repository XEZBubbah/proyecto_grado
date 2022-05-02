import React, { useState, useEffect}from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';


function Home() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const token = user?.token;
    //JWT
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])
  
  const logout= () => {
    dispatch({type: 'LOGOUT'})
    history('/')
    history(0)
    setUser(null);
  }

  const singup = () => {
    history('/signin');
  }

  const mdTheme = createTheme();


    return (   
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          {user?.result ? (
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

                <Avatar alt={user?.result.nombre} sx={{ mr: 3}} src={user?.result.imageUrl}>{user?.result.Nombre.charAt(0)}</Avatar>
              
                <Button variant="contained" onClick={logout}>Cerrar Sesión</Button>
              </Toolbar>
            </MuiAppBar>
          ) : (
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
          )
          }
          <Container maxWidth="100%" sx={{ mt: 9, mb: 4}}>
            {user?.result ? (
              <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: "100%",
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                noWrap
                align="center"
                sx={{ flexGrow: 1, mt:10 }} 
              >
                BikeApp
              </Typography>
              <Typography
                component="h5"
                color="inherit"
                align="center"
                sx={{ flexGrow: 1, mt:1, mr:5, ml:5}} 
              >
                Bienvenido/a a la aplicación web de BikeApp.
              </Typography>
              <Typography
                component="h5"
                color="inherit"
                align="center"
                sx={{ flexGrow: 1, mt:1, mr:5, ml:5, mb:4}} 
              >
              Acá podrás encontrar todas las herramientas para administrar el aplicativo móvil de una manera fácil y sencilla.
              </Typography>
              <Box textAlign='center'>
              <Button component={Link} style={{maxWidth: '250px', maxHeight: '40px'}} to="/dashboard" variant="text" color="primary">Ingresar Dashboard</Button>
              </Box>
            </Paper>
            ) : (
              <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: "100%",
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                noWrap
                align="center"
                sx={{ flexGrow: 1, mt:10 }} 
              >
                BikeApp
              </Typography>
              <Typography
                component="h5"
                color="inherit"
                align="center"
                sx={{ flexGrow: 1, mt:1, mr:5, ml:5}} 
              >
                Bienvenido/a a la aplicación web de BikeApp.
              </Typography>
              <Typography
                component="h5"
                color="inherit"
                align="center"
                sx={{ flexGrow: 1, mt:1, mr:5, ml:5, mb:4}} 
              >
              Acá podrás encontrar todas las herramientas para administrar el aplicativo móvil de una manera fácil y sencilla.
              </Typography>
              <Box textAlign='center'>
                <Button onClick={singup} style={{maxWidth: '250px', maxHeight: '40px'}} variant="contained" color="primary">Iniciar Sesión</Button>
              </Box>
            </Paper>
            )
            }
          </Container>
        </Box>
    </ThemeProvider>
    );
}

export default function HomePage() {
    return <Home />;
  }