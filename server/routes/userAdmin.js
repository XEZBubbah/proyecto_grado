const express = require("express");
const signin = require("../controllers/userAdmin.js");
const signup = require("../controllers/userAdmin.js");
var router = express.Router();

router.post('/signin', signin.signin);
router.post('/signup', signup.signup);

module.exports = router;