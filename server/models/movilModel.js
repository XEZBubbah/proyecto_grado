//import mongoose, { SchemaTypes } from 'mongoose';
const mongoose = require("mongoose");
const SchemaTypes = require("mongoose");

///////////////////////////////APLICACION MÓVIL
//Usuarios registrados en la aplicacion movil
const UsuariosAppMovilSchema = mongoose.Schema({
    Nombre: {type: String, required:true},
    Apellido: {type: String, required:true},
    Usuario: {type: String, required:true},
    Fecha_Nacimiento: {type: Date, required:true},
    Celular: {type: String, required:true},
    Correo: {type: String, required:true},
    Contraseña: {type: String, required:true},
    Avatar: {type: String, contentType: String}
});
module.exports.UsuariosAppMovil = mongoose.model("UsuariosAppMovil",UsuariosAppMovilSchema);

//Itinerarios
//Permiso: Admin => A, Invitado => I
const ItinerariosSchema = mongoose.Schema({
    Nombre_Itinerario: {type: String, required:true},
    Hora_Salida: {type: String, required:true},
    Hora_Llegada: {type: String},
    Punto_Partida: {type: Map, required:true},
    Punto_Llegada: {type: Map, required:true},
    Descripcion: {type: String},
    Permiso: {type: String, required:true},
    UAppMov_Id: {type: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {type: String, required:true},
    Grupos_Id: {type: SchemaTypes.ObjectId, required:true},
    Grupos_Nombre_Grupo: {type: String, required:true}
});
module.exports.Itinerarios = mongoose.model("Itinerarios",ItinerariosSchema);

//Grupos
//Permiso: Admin => A, Invitado => I
const GruposSchema = mongoose.Schema({
    Nombre_Grupo: {type: String, required:true},
    Descripcion: {type: String},
    Visibilidad: {type: String, required:true},
    Contraseña_Grupo: {type: String, required:false},
    Permiso: {type: String, required:true},
    UAppMov_Id: {type: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {type: String, required:true}
});
module.exports.Grupos = mongoose.model("Grupos",GruposSchema);

//Tipos de reporte enviados por un usuario registrado en la aplicacion movil
/*
Tipos de reportes
Texto           Valor
Aplicación  => Aplicacion
Usuario     => Usuario
*/

//Historico de reportes enviados por un usuario registrado en la aplicacion movil
//Estados de un reporte: Nuevo => N, En proceso => P, Finalizado => F
const ReportesSchema = mongoose.Schema({
    Asunto: {type: String, required:true},
    Estado: {type: String, required:true},
    Descripcion: {type: String, required:true},
    Fecha_Generado: {type: Date, required:true},
    Tipo_Reporte: {type: String, required:true},
    UAppMov_Id: {type: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {type: String, required:true}
});
module.exports.Reportes = mongoose.model("Reportes",ReportesSchema);

//Historico de chats relacionados a un usuario/grupo
const chatGrupo = mongoose.Schema({
    Avatar: {type: Buffer, contentType: String},
    Mensaje: {type: String, required:true},
    Fecha_Creacion: {type: Date, required:true},
    Grupos_Id: {type: SchemaTypes.ObjectId, required:true},
    Grupos_Nombre_Grupo: {type: String, required:true},
    UAppMov_Id: {type: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {type: String, required:true}
});
module.exports.chatGrupo = mongoose.model("chatGrupo",chatGrupo);
///////////////////////////////