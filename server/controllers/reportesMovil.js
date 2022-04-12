const User = require("./../models/movilModel");
const Reporte = require("./../models/movilModel");

exports.createReport = async (req, res) => {
    const { Asunto,Descripcion,Tipo_Reporte,Usuario} = req.body;
    try {
        const existingUser = await User.UsuariosAppMovil.findOne({Usuario: userName});
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