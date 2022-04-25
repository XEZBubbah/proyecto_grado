import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

const MainList = () =>{
    const history = useNavigate();
    function dashboard(){
       history('/dashboard');
    }
    function users(){
        history('/users');
    }
    function reports(){
        history('/reports');
    }
    function cartografia(){
        history('/dashboard');
    }
    function profile(){
        history('/dashboard');
    }
    return(
        <List component="nav">
            <React.Fragment>
                <ListItemButton onClick={dashboard}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton onClick={users}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItemButton>
                <ListItemButton onClick={reports}>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reportes" />
                </ListItemButton>
                <ListItemButton onClick={cartografia}>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cartografía" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListItemButton onClick={profile}>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                <ListItemText primary="Perfil" />
                </ListItemButton>
            </React.Fragment>   
        </List>
    )
}

export default MainList

