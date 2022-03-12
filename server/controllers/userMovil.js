const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/movilModel");

const secret = 'test';

exports.signin = async(req,res) => {
	const { email, password } =req.body;
	try {
		console.log(email,password);
		const existingUser = await User.UsuariosAppMovil.findOne({Correo: email});
		if(!existingUser) return res.status(404).json({ message: "El usuario no existe"});
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.Contraseña);
		
		if(!isPasswordCorrect) return res.status(404).json({ message:"La contraseña no es correcta"});

		const token = jwt.sign({Email: existingUser.email, id: existingUser._id}, secret, {expiresIn: "1h"});
		res.status(200).json({result:existingUser, token});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.signup = async(req,res) => {
	const {email, password, confirmPassword, firstName, lastName, userName, birthDate, phone} = req.body;
	try {
		const existingUser = await User.UsuariosAppMovil.findOne({Correo:email, Usuario:userName});
		if(existingUser) return res.status(400).json({ message: "El usuario ya existe"});
		if(password !== confirmPassword) return res.status(400).json({ message: "Las contraseñas no coinciden"});
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
		const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
		res.status(200).json({result, token});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}
