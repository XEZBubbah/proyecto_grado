/*import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import cors from "cors";
import userRoutes from './routes/user.js';
import config from './cors.js';*/
const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userAdminRoutes = require("./routes/userAdmin");
const userMovilRoutes = require("./routes/userMovil");
const groupMovilRoutes = require("./routes/groupMovil");
const itineraryMovilRoutes = require("./routes/itinerarioMovil");
const chatMovilRoutes = require("./routes/chatMovil");
const reportMovilRoutes = require("./routes/reportesMovil");
const reportAdminRoutes = require("./routes/reporteAdmin");
const config = require("./cors.js");

const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json({limit: '30mb', extended:true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended:true}));
app.use(cors());
app.use('/userA', userAdminRoutes);
app.use('/reportA', reportAdminRoutes);
app.use('/reportM', reportMovilRoutes);
app.use('/userM', userMovilRoutes);
app.use('/groupM', groupMovilRoutes);
app.use('/itineraryM', itineraryMovilRoutes);
app.use('/chatM', chatMovilRoutes);

//Conexión base de datos mongoDB
const BD = 'ciclorrutaDB';
const USER = 'jparra305';
const PASS = 'Bicicletas1';
const CONNECTION_URL = `mongodb+srv://${USER}:${PASS}@clusterciclorrutas.jp40z.mongodb.net/${BD}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => 
        console.log(`Server running on port: ${PORT}`)
    ))
    .catch((error) => console.log(error.message));