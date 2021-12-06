import React  from "react";
import Navbar from "./componentes/Navbar/Navbar";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./componentes/Home/Home";
import Auth from "./componentes/Auth/Auth";

const App = () => {
    return(
        <BrowserRouter>
        <Container maxWidth="lg">
         <Navbar/>
            <Routes>   
                <Route path="/" exact element={<Home/>}/>
                <Route path="/signin" exact element={<Auth/>}/>
            </Routes>
        </Container>
    </BrowserRouter>
    );

}

export default App;