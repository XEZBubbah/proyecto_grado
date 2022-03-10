import mongoose, { SchemaTypes } from 'mongoose';

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
    Nombre: {bsonType: String, required:true},
    Apellido: {bsonType: String, required:true},
    Correo: {bsonType: String, required:true},
    Contraseña: {bsonType: String, required:true},
    Reportes_Id: {bsonType: SchemaTypes.ObjectId}
});
module.exports = mongoose.model("UsuariosAdmin",UsuariosAdminSchema);
///////////////////////////////

///////////////////////////////APLICACION MÓVIL
//Usuarios registrados en la aplicacion movil
const UsuariosAppMovilSchema = mongoose.Schema({
    Nombre: {bsonType: String, required:true},
    Apellido: {bsonType: String, required:true},
    Usuario: {bsonType: String, required:true},
    Fecha_Nacimiento: {bsonType: Date, required:true},
    Celular: {bsonType: String, required:true},
    Correo: {bsonType: String, required:true},
    Contraseña: {bsonType: String, required:true},
    Foto_Perfil: {bsonType: Buffer}
});
module.exports = mongoose.model("UsuariosAppMovil",UsuariosAppMovilSchema);

//Tipos de reporte enviados por un usuario registrado en la aplicacion movil
const Tipo_ReporteSchema = mongoose.Schema({
    Tipo_Reporte: {bsonType: String, required:true},
});
module.exports = mongoose.model("Tipo_Reporte",Tipo_ReporteSchema);

//Itinerarios
const ItinerariosSchema = mongoose.Schema({
    Hora_Salida: {bsonType: Date, required:true},
    Hora_Llegada: {bsonType: Date},
    Punto_Partida: {bsonType: String, required:true},
    Punto_Llegada: {bsonType: String, required:true},
    Descripcion: {bsonType: Date},
    UAppMov_Id: {bsonType: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {bsonType: String, required:true},
    Grupos_Id: {bsonType: SchemaTypes.ObjectId, required:true},
    Grupos_Nombre_Grupo: {bsonType: String, required:true}
});
module.exports = mongoose.model("Itinerarios",ItinerariosSchema);

//Grupos
const GruposSchema = mongoose.Schema({
    Nombre_Grupo: {bsonType: String, required:true},
    Visibilidad: {bsonType: String, required:true},
    Contraseña_Grupo: {bsonType: String, required:true},
    UAppMov_Id: {bsonType: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {bsonType: String, required:true}
});
module.exports = mongoose.model("Grupos",GruposSchema);

//Historico de reportes enviados por un usuario registrado en la aplicacion movil
const ReportesSchema = mongoose.Schema({
    Asunto: {bsonType: String, required:true},
    Descripcion: {bsonType: String, required:true},
    Fecha_Generado: {bsonType: Date, required:true},
    TipRep_Id: {bsonType: SchemaTypes.ObjectId, required:true},
    TipRep_Tipo: {bsonType: String, required:true},
    UAppMov_Id: {bsonType: SchemaTypes.ObjectId, required:true},
    UAppMov_Usuario: {bsonType: String, required:true}
});
module.exports = mongoose.model("Reportes",ReportesSchema);
///////////////////////////////