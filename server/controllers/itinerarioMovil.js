const Itinerary = require('./../models/movilModel');
const User = require('./../models/movilModel');
const Group = require('./../models/movilModel');

exports.getGroupItineraries = async(req, res) => {
    const {Usuario, Grupo} = req.body;
    try {
        const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});

        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo});
        if(!existingGroup) return res.status(400).json({message: `No existe un grupo con el nombre ${Grupo}`});

        let itinerarynames = new Array();
        var useritineraries = await Itinerary.Itinerarios.find({UAppMov_Usuario: Usuario});
        for(var index in Object.keys(useritineraries)) {
            //Se almacenan los nombres de los itinerarios donde se encuentra el usuario
            itinerarynames.push(useritineraries[index].Nombre_Itinerario);
        }

        var filteredItineraries = await Itinerary.Itinerarios.find({
            Nombre_Itinerario : {$nin: itinerarynames},
            Grupos_Nombre_Grupo: Grupo
        });

        res.status(200).json({result: filteredItineraries});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.getUserItineraries = async(req, res) => {
    const {Usuario, Grupo} = req.body;
    try {
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo, UAppMov_Id: existingUser.id});
        if(!existingGroup) return res.status(400).json({
            message: "No existe un grupo relacionado a este nombre o usuario"
        });

        const itineraries = await Itinerary.Itinerarios.find({
            UAppMov_Usuario: Usuario,
            Grupos_Nombre_Grupo: Grupo
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
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo, UAppMov_Id: existingUser.id});
        if(!existingGroup) return res.status(400).json({
            message: "No existe un grupo relacionado a este nombre o usuario"
        });

        const userItinerary = await Itinerary.Itinerarios.findOne({
            Nombre_Itinerario: Itinerario,
            UAppMov_Usuario: Usuario,
            Grupos_Nombre_Grupo: Grupo
        });
		res.status(200).json({result: userItinerary});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.vinculateToItinerary = async(req, res) => {
    const {Usuario, Grupo, Itinerario} = req.body;

    try {
        const user = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!user) return res.status(400).json({message: "No se encuentra un usuario relacionado en el sistema"});

        //Se verifica que el usuario este vinculado al grupo donde se encuentra el itinerario
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo, UAppMov_Usuario: Usuario});
        if(!existingGroup) return res.status(400).json({
            message: `No existe el grupo con el nombre ${Grupo} o el usuario ${Usuario} no se encuentra vinculado`
        });

        //Se verifica que el usuario no este vinculado al itinerario
        const existingVinculateUser = await Itinerary.Itinerarios.findOne({
            Nombre_Itinerario: Itinerario,
            UAppMov_Usuario: Usuario,
            Grupos_Nombre_Grupo: Grupo
        });
        if(existingVinculateUser) return res.status(400).json({
            message: `El usuario ya se encuentra vinculado al itinerario ${Itinerario}`
        });

        const existingItinerary = await Itinerary.Itinerarios.findOne({
            Nombre_Itinerario: Itinerario,
            Grupos_Nombre_Grupo: Grupo
        });
        if(!existingItinerary) return res.status(400).json({
            message: `No existe el itinerario ${Itinerario} en el grupo ${Grupo}`
        });

        const vinculatedItinerary = await Itinerary.Itinerarios.create({
            Nombre_Itinerario: Itinerario,
            Hora_Salida: existingItinerary.Hora_Salida,
            Hora_Llegada: existingItinerary.Hora_Llegada,
            Punto_Partida: existingItinerary.Punto_Partida,
            Punto_Llegada: existingItinerary.Punto_Llegada,
            Descripcion: existingItinerary.Descripcion,
            Permiso: 'I',
            UAppMov_Id: user.id,
            UAppMov_Usuario: Usuario,
            Grupos_Id: existingGroup.id,
            Grupos_Nombre_Grupo: Grupo
        });
        res.status(200).json({result: vinculatedItinerary});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
		console.log(error);
	}
}

exports.createItinerary = async(req, res) => {
    const { Nombre_Itinerario, Hora_Salida, Hora_Llegada, Punto_Partida, 
        Punto_Llegada, Descripcion, Usuario, Nombre_Grupo} = req.body;
    try{
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo, UAppMov_Usuario: Usuario});
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
            Permiso: 'A',
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
    const { 
        Nombre_ItinerarioNew, Nombre_ItinerarioOld, Hora_Salida, Hora_Llegada, 
        Punto_Partida, Punto_Llegada, Descripcion, Usuario, Nombre_Grupo
    } = req.body;

    try{
        var update = {};

		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Nombre_Grupo, UAppMov_Usuario: Usuario});
        if(!existingGroup) return res.status(400).json({
            message: "No existe un grupo relacionado a este nombre o usuario"
        });
        
        const existingItinerary = await Itinerary.Itinerarios.findOne({Nombre_Itinerario: Nombre_ItinerarioNew});
        if(existingItinerary) return res.status(400).json({
            message: `Ya existe un itinerario con el nombre ${Nombre_ItinerarioNew}`
        });

        const existingItineraryPermiso = await Itinerary.Itinerarios.findOne({
            Nombre_Itinerario: Nombre_ItinerarioOld,
            UAppMov_Usuario: Usuario
        });
        if(!existingItineraryPermiso) return res.status(400).json({
            message: `No existe un itinerario con el nombre ${Nombre_ItinerarioOld} asociado al grupo ${Nombre_Grupo}`
        });
        if(existingItineraryPermiso.Permiso == 'I') return res.status(400).json({
            message: "No posees los permisos para editar este itinerario"
        });

        if(Nombre_ItinerarioNew === ""){console.log("Nombre de itinerario vacio");}else{update.Nombre_Itinerario = Nombre_ItinerarioNew;}
        if(Hora_Salida === ""){console.log("Hora de salida vacia");}else{update.Hora_Salida = Hora_Salida;}
        if(Hora_Llegada === ""){console.log("Hora de llegada vacia");}else{update.Hora_Llegada = Hora_Llegada;}
        if(Punto_Partida === ""){console.log("Punto de partida vacio");}else{update.Punto_Partida = Punto_Partida;}
        if(Punto_Llegada === ""){console.log("Punto de llegada vacio");}else{update.Punto_Llegada = Punto_Llegada;}
        if(Descripcion === ""){console.log("Descripción vacia");}else{update.Descripcion = Descripcion;}

        const filter = {Nombre_Itinerario: Nombre_ItinerarioOld}
        const opts = {new: true};

        const updatedItinerary = await Itinerary.Itinerarios.updateMany(filter,update,opts);
        res.status(200).json({result: 'Se ha modificado la información con exito'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Algo salió mal durante la petición"});
    }
}

exports.deleteItinerary = async(req, res) => {
    const {Usuario, Grupo, Itinerario} = req.body;
    try {
		const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
		if(!existingUser) return res.status(400).json({message: "El usuario no existe"});
		
        const existingGroup = await Group.Grupos.findOne({Nombre_Grupo: Grupo, UAppMov_Usuario: Usuario});
        if(!existingGroup) return res.status(400).json({
            message: "No existe un grupo relacionado a este nombre o usuario"
        });

        const existingItinerary = await Itinerary.Itinerarios.findOne({
            Nombre_Itinerario: Itinerario,
            UAppMov_Usuario: Usuario,
            Grupos_Nombre_Grupo: Grupo
        });
        if(!existingItinerary) return res.status(400).json({
            message: `No existe un itinerario con el nombre ${Itinerario} asociado al usuario ${Usuario} y al grupo ${Grupo}`
        });
        if(existingItinerary.Permiso == 'I') return res.status(400).json({
            message: "No posees los permisos para eliminar este itinerario"
        });

        const deletedItinerary = await Itinerary.Itinerarios.deleteMany({
            Nombre_Itinerario: Itinerario, 
            Grupos_Nombre_Grupo: Grupo
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