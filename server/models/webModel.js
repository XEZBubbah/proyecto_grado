//import mongoose, { SchemaTypes } from 'mongoose';
const mongoose = require("mongoose");
const SchemaTypes = require("mongoose");

/*const UsuarioSchema = mongoose.Schema({
    nombre: {type: String, required:true},
    apellido: {type: String, required:true},
    fechaNacimiento: Date,
    correo: {type: String, required:true},
    contraseña: {type: String, required:true},
    id: {type: String}
})
export default mongoose.model("User",UsuarioSchema);*/

///////////////////////////////APLICACION WEB
//Usuarios administradores de la aplicacion web'
const UsuariosAdminSchema = mongoose.Schema({
    Nombre: {type: String, required:true},
    Apellido: {type: String, required:true},
    Correo: {type: String, required:true},
    Contraseña: {type: String, required:true},
    Avatar: {type: Buffer},
    Reportes_Id: {type: SchemaTypes.ObjectId}
});

module.exports.UsuariosAdmin = mongoose.model("UsuariosAdmin",UsuariosAdminSchema);
///////////////////////////////