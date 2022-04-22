const express = require("express");
const signin = require("../controllers/userAdmin.js");
const signup = require("../controllers/userAdmin.js");
const fetchUserCuantity = require("../controllers/userAdmin.js");
const fetchAllUsers = require("../controllers/userAdmin.js");
const fetchUserInfoAdmin = require("../controllers/userAdmin.js");
const fetchUserInfoMovil = require("../controllers/userAdmin.js");
const modifyUserInfoAdmin = require("../controllers/userAdmin.js");
const deleteUserAccountMovil = require("../controllers/userAdmin.js");
const getUsers = require("../controllers/userAdmin.js");
const getUserMovil = require("../controllers/userAdmin.js");

var router = express.Router();

router.post('/signin', signin.signin);
router.post('/signup', signup.signup);
router.post('/fetchUserCuantity', fetchUserCuantity.fetchUserCuantity);
router.post('/fetchAllUsers', fetchAllUsers.fetchAllUsers);
router.post('/fetchUserInfoAdmin', fetchUserInfoAdmin.fetchUserInfoAdmin);
router.post('/modifyUserInfoAdmin', modifyUserInfoAdmin.modifyUserInfoAdmin);
router.post('/deleteUserAccountMovil', deleteUserAccountMovil.deleteUserAccountMovil);
router.get('/getUsers', getUsers.getUsers);
router.get('/:id', getUserMovil.getUserMovil);

module.exports = router;