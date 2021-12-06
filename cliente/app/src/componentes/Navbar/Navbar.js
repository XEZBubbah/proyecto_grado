import React from 'react'
import { Link  } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';


const Navbar = () => {
    const classes = useStyles();
    const user = null;
    return(
    <AppBar className={classes.appBar} positon="static" color="inherit">
        <div>
            <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">BikeApp</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div>
                    <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary">Cerrar Sesión</Button>
                </div>    
            ) : (
                <Button component={Link} to="/signin" variant="contained" color="primary">Iniciar Sesión</Button>
            )}
        </Toolbar>
    </AppBar>

    )
}

export default Navbar;