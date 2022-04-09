const bcrypt = require("bcryptjs");
const Group = require("../models/movilModel");
const User = require("../models/movilModel");

exports.createGroup = async(req,res) => {
//Nota: Visibilidad true => Publico, false => Privado
	const {
        Nombre_Grupo, Descripcion, Visibilidad, 
        Contraseña_Grupo, Usuario
    } = req.body;
	try {
        const user = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!user) return res.status(400).json({ message: "No se encuentra un usuario relacionado"});
        const user_Id = user.id;
        console.log("Usuario Grupo");
        console.log(user);
		const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo, UAppMov_Id: user_Id});
        if(existingGroup) return res.status(400).json({ message: "Ya existe un grupo con el mismo nombre"});
        console.log(existingGroup);
		
        var hashedPassword = ''
        var visibility = 'Publico'
        if(Visibilidad == false && Contraseña_Grupo.length == 0) {
            return res.status(400).json({ message: "Debe establecer la contraseña para crear un grupo privado"});
        }
        if(Visibilidad == false && Contraseña_Grupo.length > 0) {
            hashedPassword = await bcrypt.hash(Contraseña_Grupo, 12);
            visibility = 'Privado'
        }

        const result = await Group.Grupos.create({
            Nombre_Grupo: Nombre_Grupo,
            Descripcion: Descripcion,
            Visibilidad: visibility,
            Permiso: 'A',
            Contraseña_Grupo: hashedPassword,
            UAppMov_Id: user_Id,
            UAppMov_Usuario: Usuario
		});
		res.status(200).json({result});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.fetchGroup = async(req,res) => {
	try {
        var groups = await Group.Grupos.find({});
        console.log("Grupos");
        console.log(groups);
        //Filtrar documentos quitando informacion de campos sin interes para esta funcion
        Object.keys(groups).map(key => {
            groups[key].Contraseña_Grupo = null
            groups[key].UAppMov_Id = null
        });

        res.status(200).json({result: groups});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.fetchUserGroup = async(req,res) => {
	const { Usuario } = req.body;
	try {
        const user = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!user) return res.status(400).json({ message: "No se encuentra un usuario relacionado"});
        const user_Id = user.id;
        console.log("Usuario Grupo");
        console.log(user);

		var existingGroups = await Group.Grupos.find({UAppMov_Id: user_Id});
        console.log("Grupos existentes");
        console.log(existingGroups);

        //Filtrar documentos quitando informacion de campos sin interes para esta funcion
        Object.keys(existingGroups).map(key => {
            existingGroups[key].Contraseña_Grupo = null
            existingGroups[key].UAppMov_Id = null
        });

        res.status(200).json({result: existingGroups});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.getGroup = async(req,res) => {
	const {
        Nombre_Grupo, Contraseña_Grupo, Usuario
    } = req.body;
	try {
        const user = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!user) return res.status(400).json({ message: "No se encuentra un usuario relacionado"});
        const user_Id = user.id;
        console.log("Usuario Grupo");
        console.log(user);

		const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo, UAppMov_Id: user_Id});
        if(!existingGroup) return res.status(400).json({ message: "No existe un grupo relacionado a este nombre o usuario"});
        console.log("Grupo existente");
        console.log(existingGroup);
        const visibility = existingGroup.Visibilidad;
        if(visibility == 'Privado' && Contraseña_Grupo.length == 0) {
            return res.status(400).json({ message: "No puede acceder a un grupo privado sin digitar la contraseña"});
        }else{
            const isPasswordCorrect = await bcrypt.compare(Contraseña_Grupo, existingGroup.Contraseña_Grupo);
            if(!isPasswordCorrect) return res.status(404).json({ message:"La contraseña no es correcta"});

            res.status(200).json({
                result: {
                    Nombre_Grupo: existingGroup.Nombre_Grupo,
                    Descripcion: existingGroup.Descripcion,
                    Visibilidad: existingGroup.Visibilidad,
                    UAppMov_Usuario: existingGroup.UAppMov_Usuario
                }
            });
        }
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}