import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';



const Navbar = () => {

    const classes = useStyles();
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
      setUser(null);
    }

    return(
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">BikeApp</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.nombre} src={user?.result.imageUrl}>{user?.result.Nombre.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.nombre}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Cerrar Sesión</Button>
          </div>
        ) : (
          <Button component={Link} to="/signin" variant="contained" color="primary">Iniciar Sesión</Button>
        )}
      </Toolbar>
    </AppBar>
    )
    
}

export default Navbar;