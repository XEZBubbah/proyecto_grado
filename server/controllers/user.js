import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const secret = 'test';

export const signin = async(req,res) => {
	const { email, password } =req.body;
	try {
		console.log(email,password);
		const existingUser = await User.findOne({ correo:email });
		if(!existingUser) return res.status(404).json({ message: "El usuario no existe"});
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.contraseña);
		
		if(!isPasswordCorrect) return res.status(404).json({ message:"La contraseña no es correcta"});

		const token = jwt.sign({email: existingUser.email, id: existingUser._id}, secret, {expiresIn: "1h"});

		res.status(200).json({result:existingUser, token});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal"});
	}
}

export const signup = async(req,res) => {
	const {email, password, confirmPassword, firstName, lastName} =req.body;
	try {
		const existingUser = await User.findOne({ correo:email });
		if(existingUser) return res.status(400).json({ message: "El usuario ya existe"});
		if(password !== confirmPassword) return res.status(400).json({ message: "Las contraseñas no coinciden"});
		const hashedPassword = await bcrypt.hash(password, 12);
		console.log(email, password, firstName);
		const result = await User.create({correo: email, contraseña: hashedPassword, nombre:firstName, apellido:lastName});
		const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
		res.status(200).json({result, token});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal"});
		console.log(error);
	}
}
