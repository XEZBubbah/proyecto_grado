//import express from 'express';
//import { signin, signup } from '../controllers/user.js';

const express = require("express");
const signin = require("../controllers/user.js");
const signup = require("../controllers/user.js");
var router = express.Router();

router.post('/signin', signin.signin);
router.post('/signup', signup.signup);

module.exports = router;