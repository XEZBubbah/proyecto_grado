const Itinerary = require('./../models/movilModel');
const User = require('./../models/movilModel');
const Group = require('./../models/movilModel');

exports.getUserItineraries = async(req, res) => {
    const {Usuario, Grupo} = req.body;
    try {
		console.log(Usuario,Grupo);
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo, UAppMov_Id: existingUser.id});
        if(!existingGroup) return res.status(400).json({
            message: "No existe un grupo relacionado a este nombre o usuario"
        });

        const itineraries = await Itinerary.Itinerarios.find({
            UAppMov_Id: existingUser.id,
            Grupos_Id: existingGroup.id
        });

		res.status(200).json({result: itineraries});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.getUserItinerary = async(req, res) => {
    const {Usuario, Grupo, Itinerario} = req.body;
    try {
		console.log(Usuario,Grupo,Itinerario);
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo, UAppMov_Id: existingUser.id});
        if(!existingGroup) return res.status(400).json({
            message: "No existe un grupo relacionado a este nombre o usuario"
        });

        const userItinerary = await Itinerary.Itinerarios.findOne({
            Nombre_Itinerario: Itinerario,
            UAppMov_Id: existingUser.id,
            Grupos_Id: existingGroup.id
        });

		res.status(200).json({result: userItinerary});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.createItinerary = async(req, res) => {
    const { 
        Nombre_Itinerario, Hora_Salida, Hora_Llegada, Punto_Partida, Punto_Llegada, 
        Descripcion, Usuario, Nombre_Grupo
    } = req.body;

    try{
        console.log("\n");
        console.log(
            Nombre_Itinerario, Hora_Salida, Hora_Llegada, Punto_Partida, 
            Punto_Llegada, Descripcion, Usuario, Nombre_Grupo
        );
        console.log("\n");
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo, UAppMov_Id: existingUser.id});
        if(!existingGroup) return res.status(400).json({
            message: "No existe un grupo relacionado a este nombre o usuario"
        });

        const existingItinerary = await Itinerary.Itinerarios.findOne({Nombre_Itinerario: Nombre_Itinerario});
        if(existingItinerary) return res.status(400).json({
            message: `Ya existe un itinerario con el nombre ${Nombre_Itinerario}`
        });

        const createdItinerary = await Itinerary.Itinerarios.create({
            Nombre_Itinerario: Nombre_Itinerario,
            Hora_Salida: Hora_Salida,
            Hora_Llegada: Hora_Llegada,
            Punto_Partida: Punto_Partida,
            Punto_Llegada: Punto_Llegada,
            Descripcion: Descripcion,
            UAppMov_Id: existingUser.id,
            UAppMov_Usuario: Usuario,
            Grupos_Id: existingGroup.id,
            Grupos_Nombre_Grupo: Nombre_Grupo
        });
        res.status(202).json({result: createdItinerary});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Algo salió mal durante la petición"});
    }
}

exports.editItinerary = async(req, res) => {
    
}

exports.deleteItinerary = async(req, res) => {
    const {Usuario, Grupo, Itinerario} = req.body;
    try {
		console.log(Usuario,Grupo,Itinerario);
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo, UAppMov_Id: existingUser.id});
        if(!existingGroup) return res.status(400).json({
            message: "No existe un grupo relacionado a este nombre o usuario"
        });

        const existingItinerary = await Itinerary.Itinerarios.findOne({
            Nombre_Itinerario: Itinerario,
            UAppMov_Id: existingUser.id,
            Grupos_Id: existingGroup.id
        });
        if(!existingItinerary) return res.status(400).json({
            message: `No existe un itinerario con el nombre ${Itinerario} asociado al usuario ${Usuario} y al grupo ${Grupo}`
        });

        const deletedItinerary = await Itinerary.Itinerarios.deleteOne({
            Nombre_Itinerario: Itinerario,
            UAppMov_Id: existingUser.id,
            Grupos_Id: existingGroup.id
        });

		res.status(200).json({
            deletedItinerary: deletedItinerary.deletedCount,
            result: existingItinerary
        });
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}