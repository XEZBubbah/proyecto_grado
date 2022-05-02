import React  from "react";
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from "./componentes/Home/Home";
import Auth from "./componentes/Auth/Auth";
import Dashboard from "./componentes/Dashboard/Dashboard";
import Users from "./componentes/Users/Users";
import UserDetails  from "./componentes/User/UserDetails";
import Reports from "./componentes/Reports/Reports";
import ReportDetail from "./componentes/Report/ReportDetail";
import Cartografia from "./componentes/Cartografía/Cartografia";
import Profile from "./componentes/Profile/Profile";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return(
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" exact element={<Navigate to="/home"/>}/>
                <Route path="/home" exact element={<Home/>}/>
                <Route path="/dashboard" exact element={user? <Dashboard/> : <Navigate to="/home"/>}/>
                <Route path="/signin" exact element={user? <Navigate to="/home"/> : <Auth/>}/>
                <Route path="/users" exact element={user? <Users/>: <Navigate to="/home"/>}/>
                <Route path="/users/:id" element={user?<UserDetails/> : <Navigate to="/home"/>}/>
                <Route path="/reports" exact element={user?<Reports/> : <Navigate to="/home"/>}/>
                <Route path="/reports/:id" element={user? <ReportDetail/> : <Navigate to="/home"/>}/>
                <Route path="/cartography" exact element={user? <Cartografia/> : <Navigate to="/home"/>}/>
                <Route path="/profile" exact element={user? <Profile/> : <Navigate to="/home"/>}/>
            </Routes>
        </div>        
    </BrowserRouter>
    );

}

export default App;