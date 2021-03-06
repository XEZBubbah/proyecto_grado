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

        //Se busca la existencia de un grupo con el mismo nombre, sabiendo que el nombre del grupo es único
		const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo});
        if(existingGroup) return res.status(400).json({ message: "Ya existe un grupo con el mismo nombre"});

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
    const { Usuario } = req.body;
	try {
        let groupsname = new Array();
        var userGroups = await Group.Grupos.find({UAppMov_Usuario: Usuario});
        for(var index in Object.keys(userGroups)) {
            //Se almacenan los ids de los grupos donde se encuentra el usuario
            groupsname.push(userGroups[index].Nombre_Grupo);
        }

        var filteredGroups = await Group.Grupos.find({
            Nombre_Grupo : {$nin: groupsname}
        });

        //Filtrar documentos quitando informacion de campos sin interes para esta funcion
        Object.keys(filteredGroups).map(key => {
            filteredGroups[key].Contraseña_Grupo = null
            filteredGroups[key].UAppMov_Id = null
        });

        res.status(200).json({result: filteredGroups});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.fetchUserGroup = async(req,res) => {
	const { Usuario } = req.body;
	try {
        const user = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!user) return res.status(400).json({message: "No se encuentra un usuario relacionado"});
        const user_Id = user.id;

		var existingGroups = await Group.Grupos.find({UAppMov_Usuario: Usuario});

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

		const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo, UAppMov_Usuario: Usuario});
        if(!existingGroup) return res.status(400).json({ message: "No existe un grupo relacionado a este nombre o usuario"});

        const visibility = existingGroup.Visibilidad;
        if(visibility == 'Publico') {
            res.status(200).json({
                result: {
                    Nombre_Grupo: existingGroup.Nombre_Grupo,
                    Descripcion: existingGroup.Descripcion,
                    Visibilidad: existingGroup.Visibilidad,
                    UAppMov_Usuario: existingGroup.UAppMov_Usuario
                }
            });
        }else if(visibility == 'Privado' && Contraseña_Grupo.length == 0) {
            return res.status(400).json({message: "No puede acceder a un grupo privado sin digitar la contraseña"});
        }else {
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

exports.deleteUserGroup = async(req, res) => {
    const {Nombre_Grupo, Contraseña_Grupo, Usuario} = req.body;
    
    try {
        const user = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!user) return res.status(400).json({ message: "No se encuentra un usuario relacionado"});
        const user_Id = user.id;

		const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo, UAppMov_Usuario: Usuario});
        if(!existingGroup) return res.status(400).json({ message: "No existe un grupo relacionado a este nombre o usuario"});

        if(existingGroup.Permiso == 'I') return res.status(404).json({message: "No posees los permisos para eliminar este grupo"});

        const visibility = existingGroup.Visibilidad;
        if(visibility == 'Publico') {
            const deletedGroup = await Group.Grupos.deleteMany({Nombre_Grupo: Nombre_Grupo});
            res.status(200).json({DeletedGroups: deletedGroup.deletedCount, result: existingGroup});
        }else if(visibility == 'Privado' && Contraseña_Grupo.length == 0) {
            return res.status(400).json({message: "No puede acceder a un grupo privado sin digitar la contraseña"});
        }else {
            const isPasswordCorrect = await bcrypt.compare(Contraseña_Grupo, existingGroup.Contraseña_Grupo);
            if(!isPasswordCorrect) return res.status(404).json({message:"La contraseña no es correcta"});
            const deletedGroup = await Group.Grupos.deleteMany({Nombre_Grupo: Nombre_Grupo});
            res.status(200).json({DeletedGroups: deletedGroup.deletedCount, result: existingGroup});
        }
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.vinculateToGroup = async(req, res) => {
    const {Nombre_Grupo, Contraseña_Grupo, Usuario} = req.body;
    try {
        const user = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!user) return res.status(400).json({ message: "No se encuentra un usuario relacionado"});

        //Se busca la existencia de un grupo con el mismo nombre, sabiendo que el nombre del grupo es único
		const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo});
        if(!existingGroup) return res.status(400).json({ message: `No existe un grupo con el nombre ${Nombre_Grupo}`});

        const existingVinculateUser = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo, UAppMov_Usuario: Usuario});
        if(existingVinculateUser) return res.status(400).json({
            message: `El usuario ya se encuentra vinculado al grupo ${Nombre_Grupo} asociado a este nombre`
        });

        const visibility = existingGroup.Visibilidad;
        if(visibility == 'Privado' && Contraseña_Grupo.length == 0) {
            return res.status(400).json({message: "No puede acceder a un grupo privado sin digitar la contraseña"});
        }
        if(visibility == 'Privado' && Contraseña_Grupo.length > 0) {
            const isPasswordCorrect = await bcrypt.compare(Contraseña_Grupo, existingGroup.Contraseña_Grupo);
            if(!isPasswordCorrect) return res.status(404).json({message:"La contraseña no es correcta"});
        }
        const vinculatedGroup = await Group.Grupos.create({
            Nombre_Grupo: existingGroup.Nombre_Grupo,
            Descripcion: existingGroup.Descripcion,
            Visibilidad: existingGroup.Visibilidad,
            Contraseña_Grupo: existingGroup.Contraseña_Grupo,
            Permiso: "I",
            UAppMov_Id: user.id,
            UAppMov_Usuario: user.Usuario
        });
        res.status(200).json({result: vinculatedGroup});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

