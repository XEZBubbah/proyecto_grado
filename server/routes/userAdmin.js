const express = require("express");
//const multer = require("multer");
const signin = require("../controllers/userAdmin.js");
const signup = require("../controllers/userAdmin.js");
//const fetchAdminAvatar = require("../controllers/userAdmin.js");
const fetchUserCuantity = require("../controllers/userAdmin.js");
const fetchAllUsers = require("../controllers/userAdmin.js");
const fetchUserInfoAdmin = require("../controllers/userAdmin.js");
const modifyUserInfoAdmin = require("../controllers/userAdmin.js");
const deleteUserAccountMovil = require("../controllers/userAdmin.js");
const getUsers = require("../controllers/userAdmin.js");
const getUserMovil = require("../controllers/userAdmin.js");
const modifyAdminPass = require("../controllers/userAdmin.js");
const modifyUserMovile = require("../controllers/userAdmin.js");

var router = express.Router();

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const type = file.mimetype.split("/")[1];
//         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + type);
//     }
// });
  
// const upload = multer({storage: storage});

router.post('/signin', signin.signin);
router.post('/signup', signup.signup);
router.post('/fetchUserCuantity', fetchUserCuantity.fetchUserCuantity);
router.post('/fetchAllUsers', fetchAllUsers.fetchAllUsers);
router.post('/fetchUserInfoAdmin', fetchUserInfoAdmin.fetchUserInfoAdmin);
router.post('/modifyUserInfoAdmin', modifyUserInfoAdmin.modifyUserInfoAdmin);
router.post('/modifyAdminPass', modifyAdminPass.modifyAdminPass)
router.post('/deleteUserAccountMovil', deleteUserAccountMovil.deleteUserAccountMovil);
router.post('/modifyUserMovile', modifyUserMovile.modifyUserMovile);
//router.get('/fetchAdminAvatar/:email', fetchAdminAvatar.fetchAdminAvatar);
router.get('/getUsers', getUsers.getUsers);
router.get('/:id', getUserMovil.getUserMovil);

module.exports = router;