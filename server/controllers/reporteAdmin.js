const Reporte = require("../models/movilModel");

exports.fetchAllReports = async(req,res) => {
	try {
		const existingReports = await Reporte.Reportes.find({});
		res.status(200).json({result:existingReports});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.getReportsNuevos = async(req,res) =>{
	try{
		const existingReport = await Reporte.Reportes.find({Estado:"N"});
		res.status(200).json(existingReport.length);
	}catch(error){
		res.status(500).json({message:"Algo salió mal durante la petición"});
	}
}

exports.getReportsProceso = async(req,res) =>{
	try{
		const existingReport = await Reporte.Reportes.find({Estado:"B"});
		res.status(200).json(existingReport.length);
	}catch(error){
		res.status(500).json({message:"Algo salió mal durante la petición"});
	}
}

exports.getReportsCompleto = async(req,res) => {
	try{
		const existingReport = await Reporte.Reportes.find({Estado:"F"});
		res.status(200).json(existingReport.length);
	}catch(error){
		res.status(500).json({message:"Algo salió mal durante la petición"});
	}
}

exports.fetchReport = async(req,res) => {
	const {Report_Id} = req.body;
	try {
        const existingReport = await Reporte.Reportes.findById({_id: Report_Id});
        if(!existingReport) return res.status(200).json({message : "El reporte no existe"});
		res.status(200).json({result: existingReport});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.editReport = async(req,res) => {
	const {Report_Id, Estado} = req.body;
	try {
        const existingReport = await Reporte.Reportes.findById({_id: Report_Id});
        if(!existingReport) return res.status(200).json({message : "El reporte no existe"});

        var update = {};
            
        if(Estado === ""){
            console.log('Estado vacio');
        }else{
            update.Estado = Estado;
        }
	    const filter = {_id: Report_Id };
	    const opts = { new: true };
	    let modifyReport = await Reporte.Reportes.findOneAndUpdate(filter, update, opts);
		res.status(200).json({result: modifyReport});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}

exports.deleteReport = async(req,res) => {
	const {Report_Id} = req.body;
	try {
        const existingReport = await Reporte.Reportes.findById({_id: Report_Id});
        if(!existingReport) return res.status(200).json({message : "El reporte no existe"});

        const deletedReport = await Reporte.Reportes.findByIdAndDelete({_id: Report_Id});
		res.status(200).json({result: deletedReport});
	} catch (error) {
		res.status(500).json({message: "Algo salió mal durante la petición"});
	}
}