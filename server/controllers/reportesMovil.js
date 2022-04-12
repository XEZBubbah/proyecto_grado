const User = require("./../models/movilModel");
const Reporte = require("./../models/movilModel");

exports.createReport = async (req, res) => {
    const { Asunto,Descripcion,Tipo_Reporte,Usuario} = req.body;
    try {
        const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!existingUser) return res.status(400).json({ message: "El usuario no existe"});
        const reportes = await Reporte.Reportes.create({ 
            Asunto: Asunto,
            Estado: 'N',
            Descripcion: Descripcion,
            Fecha_Generado: new Date(),
            Tipo_Reporte: Tipo_Reporte,
            UAppMov_Id: existingUser.id,
            UAppMov_Usuario: existingUser.Usuario
        });
        res.status(200).json({message: 'Reporte Creado con Exito :)', reporte: reportes});
    }
    catch(error) {
        console.log(error);
		res.status(500).json({message: "Algo salió mal durante la petición"});
    }
}

exports.fetchReportMovil = async(req,res) => {
	const {Usuario} = req.body;
	try {
        const existingUser = await User.UsuariosAppMovil.findOne({Usuario: Usuario});
        if(!existingUser) return res.status(400).json({ message: "El usuario no existe"});
        const existingReport = await Reporte.Reportes.find({UAppMov_Id: existingUser.id});
        Object.keys(existingReport).map(key => {
            existingReport[key].UAppMov_Usuario = null
            existingReport[key].UAppMov_Id = null
        });
		res.status(200).json({result: existingReport});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}