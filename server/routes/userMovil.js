const express = require("express");
const signin = require("../controllers/userMovil");
const signup = require("../controllers/userMovil");
const fetchAllUsers = require('../controllers/userMovil');
const fetchUserInfo = require('../controllers/userMovil');
const modifyUserInfo = require('../controllers/userMovil');
var router = express.Router();

router.post('/signinMov', signin.signin);
router.post('/signupMov', signup.signup);
router.post('/fetchAllUsers', fetchAllUsers.fetchAllUsers);
router.post('/fetchUserInfo', fetchUserInfo.fetchUserInfo);
router.post('/modifyUserInfo', modifyUserInfo.modifyUserInfo);

module.exports = router;