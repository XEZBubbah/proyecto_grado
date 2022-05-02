const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/webModel");
const UserMov = require("../models/movilModel");
const reporte = require("../models/movilModel");
const Grupo = require("./../models/movilModel");
const Itinerario = require("./../models/movilModel");

const secret = 'test';

exports.signin = async(req,res) => {
	const {email, password} = req.body;
	try {
		const existingUser = await User.UsuariosAdmin.findOne({Correo: email });
		if(!existingUser) return res.status(404).json({ message: "El usuario no existe"});
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.Contraseña);
		if(!isPasswordCorrect) return res.status(404).json({ message:"La contraseña no es correcta"});
		const token = jwt.sign({Correo: existingUser.Correo, id: existingUser._id}, secret, {expiresIn: "1h"});

		res.status(200).json({result:existingUser, token});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.signup = async(req,res) => {
	const {email, password,firstName, lastName} = req.body;
	try {
		const existingUser = await User.UsuariosAdmin.findOne({Correo: email });
		if(existingUser) return res.status(400).json({ message: "El usuario ya existe"});
		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.UsuariosAdmin.create({
			Correo: email, 
			Contraseña: hashedPassword, 
			Nombre: firstName, 
			Apellido: lastName,
		});
		const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
		res.status(200).json({result, token});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

/*exports.fetchAdminAvatar = async(req,res) => {
	const { email } = req.params;
	try {
		const existingUser = await User.UsuariosAdmin.findOne({Correo: email });
		if(!existingUser) return res.status(200).json({message: "No existe el usuario"});
		var filename = existingUser.Avatar;
		if(filename != 'undefined'){
			var options = {
				root: './uploads',
				dotfiles: 'deny',
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true
				}
			}
			res.sendFile(filename.get("filename"), options);
		}
		res.status(200).json({message: "El usuario no tiene asociada una foto"});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}*/

exports.fetchUserCuantity = async(req,res) => {
	try {
		const allUsers = await UserMov.UsuariosAppMovil.find({});
		res.status(200).json(allUsers.length);
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.fetchAllUsers = async(req,res) => {
	try {
		const allUsers = await UserMov.UsuariosAppMovil.find({});
		res.status(200).json(allUsers);
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.getUsers = async(req,res) => {
	try{
		const allUsers = await UserMov.UsuariosAppMovil.find({});
		res.send({data: allUsers});
	}catch(error){
		res.status(404).json({ message: error.message });
	}
}

exports.fetchUserInfoAdmin = async(req,res) => {
	const { Correo } = req.body;
	try {
		const existingUser = await User.UsuariosAdmin.findOne({Correo: Correo });
		if(!existingUser) return res.status(200).json({ message: "No existe el usuario"});
		res.status(200).json({
			result: {
				Nombre: existingUser.Nombre,
				Apellido: existingUser.Apellido,
				Correo: existingUser.Correo
			}
			//Falta agregar Foto
		});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.getUserMovil = async(req,res) =>{
	const { id } = req.params;
	try{
		const user = await UserMov.UsuariosAppMovil.findById(id);
		res.send({data: user});
	}catch(error){
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.fetchUserInfoMovil = async(req,res) => {
	const { Usuario } = req.body;
	try {
		const existingUser = await UserMov.UsuariosAppMovil.findOne({Usuario: Usuario });
		if(!existingUser) return res.status(400).json({ message: "No existe el usuario"});
		res.status(200).json({
			result: {
				Nombre: existingUser.Nombre,
				Apellido: existingUser.Apellido,
				Correo: existingUser.Correo,
			}
		});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.modifyUserInfoAdmin = async(req,res) => {
	const {id, Correo, Nombre, Apellido} = req.body;
	try {
		const existingUserOld = await User.UsuariosAdmin.findById(id);
		if(!existingUserOld) return res.status(400).json({message: "No existe un usuario asociado"});
		var update = {};
		if(Correo === ""){
			console.log('Correo vacio');
			update.Correo=existingUserOld.Correo;
		}else{
			update.Correo = Correo;
		}
		if(Nombre === ""){
			console.log('Nombre vacio');
			update.Nombre=existingUserOld.Nombre;
		}else{
			update.Nombre = Nombre;
		}
		if(Apellido === ""){
			console.log('Apellido vacio');
			update.Apellido=existingUserOld.Apellido;
		}else{
			update.Apellido = Apellido;
		}
		const filter = { _id: id };
		const opts = { new: true };
		let modifyUser = await User.UsuariosAdmin.findOneAndUpdate(filter, update, opts);
		const ModifiedUser = await User.UsuariosAdmin.findById(id);
		const token = jwt.sign({Correo: ModifiedUser.Correo, id: ModifiedUser._id}, secret, {expiresIn: "1h"});
		res.status(200).json({result:ModifiedUser, token});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.modifyAdminPass = async(req,res) => {
	const {id, Contraseña, ContraseñaNueva, CContraseñaNueva} = req.body;
	try{
		const existingUserOld = await User.UsuariosAdmin.findById(id);	
		if(!existingUserOld) return res.status(400).json({message: "No existe un usuario asociado"});
		var update = {};
		if(ContraseñaNueva === ""){
			return res.status(400).json({message: "No ingresó contraseña"});
		} else{
			const isPasswordCorrect = await bcrypt.compare(Contraseña, existingUserOld.Contraseña);
			if(!isPasswordCorrect) return res.status(400).json({ message:"La contraseña no es correcta"});
			if(ContraseñaNueva === CContraseñaNueva){				
				const hashedPassword = await bcrypt.hash(ContraseñaNueva, 12);
				update.Contraseña = hashedPassword;
			}else{
				return res.status(400).json({ message:"Las contraseñas no coinciden"});
			}
		}
		const filter = { _id: id };
		const opts = { new: true };
		let modifyUser = await User.UsuariosAdmin.findOneAndUpdate(filter, update, opts);
		const ModifiedUser = await User.UsuariosAdmin.findById(id);
		const token = jwt.sign({Correo: ModifiedUser.Correo, id: ModifiedUser._id}, secret, {expiresIn: "1h"});
		res.status(200).json({
			result:ModifiedUser, token});
	}catch(error){
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}


exports.deleteUserAccountAdmin = async(req,res) => {
	const {Correo, password} = req.body;
	try {
		const existingUser = await User.UsuariosAdmin.findOne({Correo: Correo});
		if(!existingUser) return res.status(200).json({ message: "No existe el usuario"});
		const user_Id = existingUser.id;

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.Contraseña);
		if(!isPasswordCorrect) return res.status(200).json({ message:"La contraseña no es correcta"});
		
		//Reportes asociados al usuario
		const reportesUser = await reporte.Reportes.find({UAppMov_Id: user_Id});
		
		//Extrae las llaves para iterar sobre reportesUser con esta estructura [{},{},{}]
		var indices_G = Object.keys(reportesUser)
		for(iter of indices_G) {
			reportesUser[iter]["Estado"] = 'F'
		}

		//Eliminacion del usuario
		const deletedUser = await User.UsuariosAdmin.findOneAndDelete({Correo: Correo});
		res.status(200).json({result: "deletedUser", UsuarioEliminado: deletedUser});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.deleteUserAccountMovil = async(req,res) => {
	const {Usuario} = req.body;
	try {
		const existingUser = await UserMov.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(200).json({ message: "No existe el usuario"});
		const user_Id = existingUser.id;

		//Itinerarios asociados al usuario
		const itinerariosUser = await Itinerario.Itinerarios.find({UAppMov_Id: user_Id});

		//Extrae las llaves para iterar sobre itinerariosUser con esta estructura [{},{},{}]
		var indices_I = Object.keys(itinerariosUser)
		for(iter of indices_I) {
			var id_Itinerario = itinerariosUser[iter]["_id"];
			var itinerarioDeleted = await Itinerario.Itinerarios.findByIdAndDelete({_id: id_Itinerario});
		}

		//Grupos asociados al usuario
		const gruposUser = await Grupo.Grupos.find({UAppMov_Id: user_Id});

		//Extrae las llaves para iterar sobre itinerariosUser con esta estructura [{},{},{}]
		var indices_G = Object.keys(gruposUser)
		for(iter of indices_G) {
			var id_Grupo = gruposUser[iter]["_id"];
			var grupoDeleted = await Grupo.Grupos.findByIdAndDelete({_id: id_Grupo});
		}

		//Eliminacion del usuario
		const deletedUser = await UserMov.UsuariosAppMovil.findOneAndDelete({Usuario: Usuario});
		res.status(200).json({result: "deletedUser", UsuarioEliminado: deletedUser});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.modifyUserMovile = async(req,res) =>{
	const {id, Correo, Nombre, Apellido, Usuario, Celular, Fecha_Nacimiento} = req.body;
	try{
		const existingUserOld = await UserMov.UsuariosAppMovil.findById(id);
		if(!existingUserOld) return res.status(400).json({message: "No existe un usuario asociado"});
		var update = {};
		if(Correo === ""){
			update.Correo=existingUserOld.Correo;
		}else{
			update.Correo = Correo;
		}
		if(Nombre === ""){
			update.Nombre=existingUserOld.Nombre;
		}else{
			update.Nombre = Nombre;
		}
		if(Apellido === ""){
			update.Apellido=existingUserOld.Apellido;
		}else{
			update.Apellido = Apellido;
		}
		if(Usuario === ""){
			update.Usuario=existingUserOld.Usuario;
		}else{
			update.Usuario = Usuario;
		}
		if(Celular === ""){
			update.Celular=existingUserOld.Celular;
		}else{
			update.Celular = Celular;
		}
		if(Fecha_Nacimiento === null){
			update.Fecha_Nacimiento=existingUserOld.Fecha_Nacimiento;
		}else{
			update.Fecha_Nacimiento = Fecha_Nacimiento;
		}
		const filter = { _id: id };
		const opts = { new: true };
		let modifyUser = await UserMov.UsuariosAppMovil.findOneAndUpdate(filter, update, opts);
		const ModifiedUser = await UserMov.UsuariosAppMovil.findById(id);
		res.status(200).json({result:ModifiedUser});
	}catch(error){
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}