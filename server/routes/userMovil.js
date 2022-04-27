const express = require("express");
const signin = require("../controllers/userMovil");
const signup = require("../controllers/userMovil");
const fetchAllUsers = require('../controllers/userMovil');
const fetchUserInfo = require('../controllers/userMovil');
const fetchUserAvatar = require('../controllers/userMovil');
const modifyUserInfo = require('../controllers/userMovil');
const deleteUserAccount = require('../controllers/userMovil');
const restorePassword = require('../controllers/userMovil');
const changePassword = require('../controllers/userMovil');

var router = express.Router();

router.post('/signinMov', signin.signin);
router.post('/signupMov', signup.signup);
router.post('/fetchAllUsers', fetchAllUsers.fetchAllUsers);
router.post('/fetchUserInfo', fetchUserInfo.fetchUserInfo);
router.get('/fetchUserAvatar/:Usuario',fetchUserAvatar.fetchUserAvatar);
router.post('/modifyUserInfo', modifyUserInfo.modifyUserInfo);
router.post('/deleteUserAccount', deleteUserAccount.deleteUserAccount);
router.post('/restorePassword', restorePassword.restorePassword);
router.post('/changePassword', changePassword.changePassword);

module.exports = router;