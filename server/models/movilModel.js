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
    Foto_Perfil: {type: Buffer}
});
module.exports = mongoose.model("UsuariosAppMovil",UsuariosAppMovilSchema);

//Tipos de reporte enviados por un usuario registrado en la aplicacion movil
const Tipo_ReporteSchema = mongoose.Schema({
    Tipo_Reporte: {type: String, required:true},
});
module.exports = mongoose.model("Tipo_Reporte",Tipo_ReporteSchema);

//Itinerarios
const ItinerariosSchema = mongoose.Schema({
    Hora_Salida: {type: Date, required:true},
    Hora_Llegada: {type: Date},
    Punto_Partida: {type: String, required:true},
    Punto_Llegada: {type: String, required:true},
    Descripcion: {type: Date},
    UAppMov_Id: {type: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {type: String, required:true},
    Grupos_Id: {type: SchemaTypes.ObjectId, required:true},
    Grupos_Nombre_Grupo: {type: String, required:true}
});
module.exports = mongoose.model("Itinerarios",ItinerariosSchema);

//Grupos
const GruposSchema = mongoose.Schema({
    Nombre_Grupo: {type: String, required:true},
    Visibilidad: {type: String, required:true},
    Contraseña_Grupo: {type: String, required:true},
    UAppMov_Id: {type: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {type: String, required:true}
});
module.exports = mongoose.model("Grupos",GruposSchema);

//Historico de reportes enviados por un usuario registrado en la aplicacion movil
const ReportesSchema = mongoose.Schema({
    Asunto: {type: String, required:true},
    Descripcion: {type: String, required:true},
    Fecha_Generado: {type: Date, required:true},
    TipRep_Id: {type: SchemaTypes.ObjectId, required:true},
    TipRep_Tipo: {type: String, required:true},
    UAppMov_Id: {type: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {type: String, required:true}
});
module.exports = mongoose.model("Reportes",ReportesSchema);
///////////////////////////////