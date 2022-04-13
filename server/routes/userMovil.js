const express = require("express");
const signin = require("../controllers/userMovil");
const signup = require("../controllers/userMovil");
const fetchAllUsers = require('../controllers/userMovil');
const fetchUserInfo = require('../controllers/userMovil');
const modifyUserInfo = require('../controllers/userMovil');
const deleteUserAccount = require('../controllers/userMovil');
const restorePassword = require('../controllers/userMovil');
const changePassword = require('../controllers/userMovil');
const multer = require('multer');
//define storage for the images
var storage = multer.memoryStorage()
//upload parameters for multer
const upload = multer({
	storage: storage,
	limits: {fieldSize: 1024 * 1024 * 3,},
});

var router = express.Router();

router.post('/signinMov', signin.signin);
router.post('/signupMov',upload.single("avatar"), signup.signup);
router.post('/fetchAllUsers', fetchAllUsers.fetchAllUsers);
router.post('/fetchUserInfo', fetchUserInfo.fetchUserInfo);
router.post('/modifyUserInfo', modifyUserInfo.modifyUserInfo);
router.post('/deleteUserAccount', deleteUserAccount.deleteUserAccount);
router.post('/restorePassword', restorePassword.restorePassword);
router.post('/changePassword', changePassword.changePassword);

module.exports = router;