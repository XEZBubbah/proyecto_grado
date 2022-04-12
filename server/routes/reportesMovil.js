const express = require("express");
const createReport = require("../controllers/reportesMovil");
const fetchReportMovil = require("../controllers/reportesMovil");

var router = express.Router();

router.post('/createReport', createReport.createReport);
router.post('/fetchReportMovil', fetchReportMovil.fetchReportMovil);

module.exports = router;