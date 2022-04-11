import React  from "react";
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from "./componentes/Home/Home";
import Auth from "./componentes/Auth/Auth";
import Dashboard from "./componentes/Dashboard/Dashboard";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return(
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" exact element={<Navigate to="/home"/>}/>
                <Route path="/home" exact element={<Home/>}/>
                <Route path="/dashboard" exact element={<Dashboard/>}/>
                <Route path="/signin" exact element={user? <Navigate to="/home"/> : <Auth/>}/>
            </Routes>
        </div>
    </BrowserRouter>
    );

}

export default App;