import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import cors from "cors";

import menuRoutes from './routes/menu_Principal.js';
import login from './routes/login.js';

const app = express();

app.use('/menu', menuRoutes);
app.use('/login', login);

app.use(bodyParser.json({ limit: '30mb', extended:true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended:true}))
app.use(cors());

//Conexión base de datos mongoDB

const CONECCTION_URL = 'mongodb+srv://jparra305:Bicicletas1@clusterciclorrutas.jp40z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONECCTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);