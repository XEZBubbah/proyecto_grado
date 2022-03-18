const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/webModel");

const secret = 'test';

exports.signin = async(req,res) => {
	const {email, password} = req.body;
	try {
		console.log("corre" + email,password);
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
