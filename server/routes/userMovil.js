const express = require("express");
const signin = require("../controllers/userMovil");
const signup = require("../controllers/userMovil");
var router = express.Router();

router.get('/signinMov', signin.signin);
router.post('/signupMov', signup.signup);

module.exports = router;