import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Title from './Microcomponents/Title';
import Clock from './DateItems/Clock';
import Date from './DateItems/Date'
import UsersTable from './Microcomponents/RecentUsers';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems} from "../DashList/DashList";
import { fetchUserCuantity } from '../../api';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [usuariosTotal, setUsuariosTotal] = useState(0);
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    fetchUserCuantity().then((response) =>{
      setUsuariosTotal(response.data);
    })
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])



  const logout= () => {
    dispatch({type: 'LOGOUT'})
    history('/')
    setUser(null);
  }


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
              <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                BikeApp Dashboard
              </Typography>
              <Avatar alt={user?.result.nombre} sx={{ mr: 3}} src={user?.result.imageUrl}>{user?.result.Nombre.charAt(0)}</Avatar>
              <IconButton color="inherit" sx={{ mr: 3}} >
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Button variant="contained" onClick={logout}>Cerrar Sesión</Button>
            </Toolbar>
          </AppBar>
    
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',                  
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>                
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider/>
              <List component="nav">
                {mainListItems}
                  <Divider sx={{ my: 1 }} />
                {secondaryListItems}
              </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[100]                    
                : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
          >
            <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Bienvenida */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                    >
                      <Title>Bienvenido/a {user?.result.Nombre}</Title>
                      <Typography component="p" variant="h6">
                        Hay un total de {usuariosTotal} usuarios
                      </Typography>
                      <Clock></Clock>
                      <Date></Date>
                    </Paper>
                  </Grid>
                  {/*  Reportes */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                      }}
                    >
                    </Paper>
                  </Grid>
                  {/* Usuarios recientes*/}
                  <Grid item xs={12}>
                    <Paper 
                      sx={{ 
                        p: 2,
                        height: '100%',
                        flexDirection: 'column'
                      }}
                    >
                      <UsersTable>
                      </UsersTable>        
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}