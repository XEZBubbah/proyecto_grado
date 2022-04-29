const express = require("express");
const setAlert = require("./../controllers/alertaMovil");
const fetchAlerts = require("./../controllers/alertaMovil");

var router = express.Router();

router.post('/setAlert', setAlert.setAlert);
router.get('/fetchAlerts', fetchAlerts.fetchAlerts);

module.exports = router;