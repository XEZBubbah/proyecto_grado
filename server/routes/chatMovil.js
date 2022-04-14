const express = require("express");
const storeUserMessages = require("./../controllers/chatMovil");
const fetchChatMessages = require("./../controllers/chatMovil");

var router = express.Router();

router.post('/storeUserMessages', storeUserMessages.storeUserMessages);
router.post('/fetchChatMessages', fetchChatMessages.fetchChatMessages);

module.exports = router;