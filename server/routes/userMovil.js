const express = require("express");
const signin = require("../controllers/userMovil");
const signup = require("../controllers/userMovil");
const fetchUserInfo = require('../controllers/userMovil');
var router = express.Router();

router.post('/signinMov', signin.signin);
router.post('/signupMov', signup.signup);
router.post('/fetchUserInfo', fetchUserInfo.fetchUserInfo);

module.exports = router;