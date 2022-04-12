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
		console.log("correo " + email,password);
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
	const {email, password, confirmPassword, firstName, lastName} = req.body;
	try {
		const existingUser = await User.UsuariosAdmin.findOne({Correo: email });
		if(existingUser) return res.status(400).json({ message: "El usuario ya existe"});
		//if(password !== confirmPassword) return res.status(400).json({ message: "Las contraseñas no coinciden"});
		const hashedPassword = await bcrypt.hash(password, 12);
		console.log(email, password, firstName);
		const result = await User.UsuariosAdmin.create({
			Correo: email, 
			Contraseña: hashedPassword, 
			Nombre: firstName, 
			Apellido: lastName
		});
		const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
		res.status(200).json({result, token});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.fetchAllUsers = async(req,res) => {
	//Agregar imagen
	try {
		const allUsers = await User.UsuariosAdmin.find({});
		console.log("Usuarios registrados en la APPMovil");
		console.log(allUsers);
		//Filtrar documentos quitando informacion de campos sin interes para esta funcion
		Object.keys(allUsers).map(key => {
            allUsers[key]._id = null
            //allUsers[key].Contraseña = null
        });

		res.status(200).json({result: allUsers});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
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

exports.modifyUserInfoAdmin = async(req, res) => {
	const {email, nameNew, passwordOld, passwordNew} = req.body;
	const existingUserOld = await User.UsuariosAdmin.findOne({Correo: email});
	if(!existingUserOld) return res.status(200).json({message: "No existe un usuario asociado"});
	var update = {};

	if(nameNew === ""){
		console.log('Nombre vacio');
	}else{
		update.Nombre = nameNew;
	}
	if(passwordNew === ""){
		console.log('Contraseña vacia');
	} else{
		const isPasswordCorrect = await bcrypt.compare(passwordOld, existingUserOld.Contraseña);
		if(!isPasswordCorrect) return res.status(200).json({ message:"La contraseña no es correcta"});
		const hashedPassword = await bcrypt.hash(passwordNew, 12);
		update.Contraseña = hashedPassword;
	} 

	const filter = { Correo: email };
	const opts = { new: true };
	let modifyUser = await User.UsuariosAdmin.findOneAndUpdate(filter, update, opts);
	//modifyUser = await User.UsuariosAppMovil.findOne({Usuario: userNameNew});
	res.status(200).json({
		result: 'Se ha modificado la información con exito',
		Modificado: modifyUser
	});
}

exports.deleteUserAccountAdmin = async(req,res) => {
	const {Correo, password} = req.body;
	try {
		const existingUser = await User.UsuariosAdmin.findOne({Correo: Correo});
		if(!existingUser) return res.status(200).json({ message: "No existe el usuario"});
		const user_Id = existingUser.id;

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.Contraseña);
		if(!isPasswordCorrect) return res.status(200).json({ message:"La contraseña no es correcta"});

		console.log("\nUsuario a eliminar..\n");
		console.log(existingUser);
		
		//Reportes asociados al usuario
		const reportesUser = await reporte.Reportes.find({UAppMov_Id: user_Id});
		console.log("\nReportes asociados al usuario\n");
		console.log(reportesUser);
		
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

		console.log("\nUsuario a eliminar..\n");
		console.log(existingUser);

		//Itinerarios asociados al usuario
		const itinerariosUser = await Itinerario.Itinerarios.find({UAppMov_Id: user_Id});
		console.log("\nItinerarios asociados al usuario\n");
		console.log(itinerariosUser);

		//Extrae las llaves para iterar sobre itinerariosUser con esta estructura [{},{},{}]
		var indices_I = Object.keys(itinerariosUser)
		for(iter of indices_I) {
			var id_Itinerario = itinerariosUser[iter]["_id"];
			var itinerarioDeleted = await Itinerario.Itinerarios.findByIdAndDelete({_id: id_Itinerario});
  			console.log(id_Itinerario);
			console.log(itinerarioDeleted);
		}

		//Grupos asociados al usuario
		const gruposUser = await Grupo.Grupos.find({UAppMov_Id: user_Id});
		console.log("\nGrupos asociados al usuario\n");
		console.log(gruposUser);
		//Extrae las llaves para iterar sobre itinerariosUser con esta estructura [{},{},{}]
		var indices_G = Object.keys(gruposUser)
		for(iter of indices_G) {
			var id_Grupo = gruposUser[iter]["_id"];
			var grupoDeleted = await Grupo.Grupos.findByIdAndDelete({_id: id_Grupo});
  			console.log(id_Grupo);
			console.log(grupoDeleted);
		}

		//Eliminacion del usuario
		const deletedUser = await UserMov.UsuariosAppMovil.findOneAndDelete({Usuario: Usuario});
		res.status(200).json({result: "deletedUser", UsuarioEliminado: deletedUser});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}