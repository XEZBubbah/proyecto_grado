const express = require("express");
const createReport = require("../controllers/reportesMovil");

var router = express.Router();

router.post('/createReport', createReport.createReport);

module.exports = router;