const express = require("express");
const fetchAllReports = require("../controllers/reporteAdmin");
const fetchReport = require("../controllers/reporteAdmin");
const editReport = require("../controllers/reporteAdmin");
const deleteReport = require("../controllers/reporteAdmin");
const getReportsNuevos = require("../controllers/reporteAdmin");
const getReportsProceso = require("../controllers/reporteAdmin");
const getReportsCompleto = require("../controllers/reporteAdmin");

var router = express.Router();

router.post('/fetchAllReports', fetchAllReports.fetchAllReports);
router.post('/fetchReport', fetchReport.fetchReport);
router.post('/editReport', editReport.editReport);
router.post('/deleteReport', deleteReport.deleteReport);
router.get('/getReportsNuevos', getReportsNuevos.getReportsNuevos);
router.get('/getReportsProceso', getReportsProceso.getReportsProceso);
router.get('/getReportsCompleto', getReportsCompleto.getReportsCompleto);
module.exports = router;