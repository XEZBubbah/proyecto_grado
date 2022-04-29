const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongooseConnect = require('./models/mongoDBConnect');
const cors = require("cors");
const userAdminRoutes = require("./routes/userAdmin");
const userMovilRoutes = require("./routes/userMovil");
const groupMovilRoutes = require("./routes/groupMovil");
const itineraryMovilRoutes = require("./routes/itinerarioMovil");
const chatMovilRoutes = require("./routes/chatMovil");
const reportMovilRoutes = require("./routes/reportesMovil");
const reportAdminRoutes = require("./routes/reporteAdmin");
const alertaMovilRoutes = require("./routes/alertaMovil");
const config = require("./cors.js");
const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config({path: __dirname + '/.env'});

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
app.use('/alertaM', alertaMovilRoutes);

//Conexión a la base de datos MongoDB
mongooseConnect.dbconnect(app,PORT);

module.exports = app;