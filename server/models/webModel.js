//import mongoose, { SchemaTypes } from 'mongoose';
const mongoose = require("mongoose");
const SchemaTypes = require("mongoose");

//Usuarios administradores de la aplicacion web'
const UsuariosAdminSchema = mongoose.Schema({
    Nombre: {type: String, required:true},
    Apellido: {type: String, required:true},
    Correo: {type: String, required:true},
    Contraseña: {type: String, required:true},
    Avatar: {type: Map},
    Reportes_Id: {type: SchemaTypes.ObjectId}
});

module.exports.UsuariosAdmin = mongoose.model("UsuariosAdmin",UsuariosAdminSchema);
