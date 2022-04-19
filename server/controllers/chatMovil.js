const Chat = require('./../models/movilModel');
const User = require('./../models/movilModel');
const Group = require('./../models/movilModel');
const mongoose = require("mongoose");

exports.storeUserMessages = async(req, res) => {
    const {text, Usuario, Grupo, createdAt} = req.body;
    try{
        console.log(text, Usuario, Grupo, createdAt);

        const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!existingUser) return res.status(400).json({message: "El usuario no existe"});

        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo, UAppMov_Id: existingUser.id});
        if(!existingGroup) return res.status(400).json({message: "El grupo no se encuentra asociado al usuario ingresado"});
        console.log(existingUser);

        var fecha = new Date();
        const newChatRecord = await Chat.chatGrupo.create({
            //Avatar: '',
            Mensaje: text,
            Fecha_Creacion: createdAt,
            Grupos_Id: existingGroup.id,
            Grupos_Nombre_Grupo: existingGroup.Nombre_Grupo,
            UAppMov_Id: existingUser.id,
            UAppMov_Usuario: existingUser.Usuario
        });
        res.status(200).json({result: newChatRecord});
    } catch (error) {
        res.status(500).json({message: "Algo salió mal durante la petición"});
        console.log(error);
    }
}

exports.fetchChatMessages = async(req, res) => {
    const {Grupo} = req.body;
    try{
        const existingGroups = await Group.Grupos.find({Nombre_Grupo: Grupo});
        if(!existingGroups) return res.status(400).json({message: "No existen grupos asociados al nombre ingresado"});
        //Se almacena el nombre del grupo. Por defecto almacena el primer registro que retorne la query
        //Porque el nombre será el mismo.
        const groupName = existingGroups[0].Nombre_Grupo;

        let userGroupIds = new Array();
        for(id in Object.keys(existingGroups)){
            //Se almacena en un array los ids de los usuarios asociados al grupo
            userGroupIds.push(existingGroups[id].UAppMov_Id);
        }
        console.log(userGroupIds);
        //Se trae los mensajes de todos los usuarios asociados a ese grupo (chat) de forma descendente
        //por el atributo fecha de creacion 
        const chatMessages = await Chat.chatGrupo.find({
            UAppMov_Id: {$in: userGroupIds},
            Grupos_Nombre_Grupo: groupName
        }).sort({Fecha_Creacion: 'desc'}).snapshot(true);

        console.log(chatMessages);
        res.status(200).json({result: chatMessages});
    } catch (error) {
        res.status(500).json({message: "Algo salió mal durante la petición"});
        console.log(error);
    }
}