const express = require("express");
const multer = require('multer');
const signin = require("../controllers/userMovil");
const signup = require("../controllers/userMovil");
const fetchAllUsers = require('../controllers/userMovil');
const fetchUserInfo = require('../controllers/userMovil');
const fetchUserAvatar = require('../controllers/userMovil');
const modifyUserInfo = require('../controllers/userMovil');
const deleteUserAccount = require('../controllers/userMovil');
const restorePassword = require('../controllers/userMovil');
const changePassword = require('../controllers/userMovil');
const path = require('path');

var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
      console.log("\nFile Multer");
      console.log(file);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const type = file.mimetype.split("/")[1];
      console.log(file.fieldname + '-' + uniqueSuffix + '.' + type);
      console.log("\n");
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + type);
    }
});
  
const upload = multer({storage: storage});

router.post('/signinMov', signin.signin);
router.post('/signupMov', upload.single("avatar"), signup.signup);
router.post('/fetchAllUsers', fetchAllUsers.fetchAllUsers);
router.post('/fetchUserInfo', fetchUserInfo.fetchUserInfo);
router.get('/fetchUserAvatar/:Usuario',fetchUserAvatar.fetchUserAvatar);
router.post('/modifyUserInfo', modifyUserInfo.modifyUserInfo);
router.post('/deleteUserAccount', deleteUserAccount.deleteUserAccount);
router.post('/restorePassword', restorePassword.restorePassword);
router.post('/changePassword', changePassword.changePassword);

module.exports = router;