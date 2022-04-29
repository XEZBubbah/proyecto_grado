const Alerta = require('../models/movilModel');

exports.setAlert = async(req,res) => {
    const { Nombre_Alerta, Descripcion, latitude, longitude } = req.body;
    try {
        console.log(Nombre_Alerta, Descripcion, latitude, longitude);
        if(Nombre_Alerta === "") res.status(400).json({message: "Debe establecer el asunto"});
        if(Descripcion === "") res.status(400).json({message: "Debe establecer la descripcion"});
        if(latitude === "") res.status(400).json({message: "Debe establecer la latitud"});
        if(longitude === "") res.status(400).json({message: "Debe establecer la longitud"});

        const newAlert = await Alerta.alertasMapa.create({
            Nombre_Alerta: Nombre_Alerta,
            Descripcion: Descripcion,
            latitude: latitude,
            longitude: longitude,
            CreatedAt: Date.now()
        });
        res.status(200).json({result: newAlert});
    }catch(error){
        res.status(500).json({message: "Algo salió mal durante la petición"});
    }
}

exports.fetchAlerts = async(req,res) => {
    try {
        const alerts = await Alerta.alertasMapa.find({});
        res.status(200).json({result: alerts});
    }catch (error){
        res.status(500).json({message: "Algo salió mal durante la petición"});
    }
}