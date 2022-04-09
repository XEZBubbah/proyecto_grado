const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/movilModel");
const Grupo = require("./../models/movilModel");
const Itinerario = require("./../models/movilModel");
const secret = 'test';
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

exports.signin = async(req,res) => {
	const { userName, password } =req.body;
	try {
		console.log(userName,password);
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: userName});
		if(!existingUser) return res.status(400).json({ message: "El usuario no existe"});
		
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.Contraseña);
		if(!isPasswordCorrect) return res.status(400).json({ message:"La contraseña no es correcta"});

		const token = jwt.sign({Usuario: existingUser.userName, id: existingUser._id}, secret, {expiresIn: "1h"});
		res.status(200).json({result:existingUser, token});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.signup = async(req,res) => {
	const {email, password, confirmPassword, firstName, lastName, userName, birthDate, phone, avatar} = req.body;
	try {
		const existingUser = await User.UsuariosAppMovil.findOne({Correo:email, Usuario:userName});
		User.UsuariosAppMovil.findOneAndUpdate({})
		if(existingUser) return res.status(400).json({message: "El usuario ya existe"});
		//if(password !== confirmPassword) return res.status(200).json({ message: "Las contraseñas no coinciden"});
		const hashedPassword = await bcrypt.hash(password, 12);
		console.log(email, password, firstName);

		const result = await User.UsuariosAppMovil.create({
			Nombre: firstName, 
			Apellido: lastName,
			Usuario: userName,
			Fecha_Nacimiento: birthDate,
			Celular: phone,
			Correo: email, 
			Contraseña: hashedPassword 
		});
		//saveAvatarImage(existingUser, avatar);
			//const newUser = await existingUser.save()
		const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
		res.status(200).json({result, token});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

function saveAvatarImage(User, EncodedImage) {
	if(EncodedImage == null) return;

	var img = JSON.parse(EncodedImage);
	if(img != null && imageMimeTypes.includes(img.type)){
		User.img = new Buffer.from(img.data, "base64");
		User.imgType = img.type;
	}
}

exports.fetchUserInfo = async(req,res) => {
	const { Usuario } = req.body;
	try {
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario });
		if(!existingUser) return res.status(200).json({ message: "No existe el usuario"});
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

exports.fetchAllUsers = async(req,res) => {
	try {
		const allUsers = await User.UsuariosAppMovil.find({});
		console.log("Usuarios registrados en la APPMovil");
		console.log(allUsers);
		//Filtrar documentos quitando informacion de campos sin interes para esta funcion
		Object.keys(allUsers).map(key => {
            allUsers[key]._id = null
            allUsers[key].Contraseña = null
        });
		res.status(200).json({result: allUsers});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.deleteUserAccount = async(req,res) => {
	const {Usuario} = req.body;
	try {
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
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
		const deletedUser = await User.UsuariosAppMovil.findOneAndDelete({Usuario: Usuario});
		res.status(200).json({result: "deletedUser", UsuarioEliminado: deletedUser});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.modifyUserInfo = async(req, res) => {
	const {email, userNameOld, userNameNew, phone} = req.body;
	const existingUserOld = await User.UsuariosAppMovil.findOne({Usuario: userNameOld});
	if(!existingUserOld) return res.status(200).json({message: "No existe un usuario asociado"});
	var update = {};

	if(email === ""){
		console.log('Email vacio');
	}else{
		update.Correo = email;
		const existingEmail = await User.UsuariosAppMovil.findOne({Correo: email});
		if(existingEmail) return res.status(200).json({message: "Este correo electrónico ya se encuentra en uso"});
	}
	if(userNameNew === ""){
		console.log('Username vacio');
	} else{
		update.Usuario = userNameNew;
		const existingUserNew = await User.UsuariosAppMovil.findOne({Usuario: userNameNew});
		if(existingUserNew) return res.status(200).json({message: "Este nombre de usuario ya se encuentra en uso"});
	} 
	if(phone === ""){
		console.log('Phone vacio');
	}else{
		update.Celular = phone;
	}
	const filter = { Usuario: userNameOld };
	const opts = { new: true };
	let modifyUser = await User.UsuariosAppMovil.findOneAndUpdate(filter, update, opts);
	//modifyUser = await User.UsuariosAppMovil.findOne({Usuario: userNameNew});
	res.status(200).json({
		result: 'Se ha modificado la información con exito'
	});
}