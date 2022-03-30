const express = require("express");
const createGroup = require("../controllers/groupMovil");
const fetchGroup = require("../controllers/groupMovil");
const fetchUserGroup = require("../controllers/groupMovil");
const getGroup = require("../controllers/groupMovil");
var router = express.Router();

router.post('/createGroupMov', createGroup.createGroup);
router.post('/fetchGroupMov', fetchGroup.fetchGroup);   //Listar grupos en general
router.post('/fetchUserGroupMov', fetchUserGroup.fetchUserGroup); //Listar grupos asociados a un usuario
router.post('/getGroupMov', getGroup.getGroup); //Ingresar a grupo determinado de un usuario

module.exports = router;