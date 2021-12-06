import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
    nombre: {type: String, required:true},
    apellido: {type: String, required:true},
    fechaNacimiento: Date,
    correo: {type: String, required:true},
    contraseña: {type: String, required:true},
    id: {type: String}
})

export default mongoose.model("User",UsuarioSchema);