const express = require("express");
const createGroup = require("../controllers/groupMovil");
const getGroup = require("../controllers/groupMovil");
var router = express.Router();

router.post('/createGroupMov', createGroup.createGroup);
router.post('/getGroupMov', getGroup.getGroup);

module.exports = router;