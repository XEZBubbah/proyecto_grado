const express = require("express");
const getGroupItineraries = require("../controllers/itinerarioMovil");
const getUserItineraries = require("../controllers/itinerarioMovil");
const getUserItinerary = require("../controllers/itinerarioMovil");
const createItinerary = require("../controllers/itinerarioMovil");
const deleteItinerary = require("../controllers/itinerarioMovil");
const editItinerary = require("../controllers/itinerarioMovil");
const vinculateToItinerary = require("../controllers/itinerarioMovil");

var router = express.Router();

router.post('/getGroupItineraries', getGroupItineraries.getGroupItineraries);
router.post('/getUserItineraries', getUserItineraries.getUserItineraries);
router.post('/getUserItinerary', getUserItinerary.getUserItinerary);
router.post('/createItinerary', createItinerary.createItinerary);
router.post('/deleteItinerary', deleteItinerary.deleteItinerary);
router.post('/editItinerary', editItinerary.editItinerary);
router.post('/vinculateToItinerary', vinculateToItinerary.vinculateToItinerary);

module.exports = router;