const express = require("express");
const getUserItineraries = require("../controllers/itinerarioMovil");
const getUserItinerary = require("../controllers/itinerarioMovil");
const createItinerary = require("../controllers/itinerarioMovil");
const deleteItinerary = require("../controllers/itinerarioMovil");

var router = express.Router();

router.post('/getUserItineraries', getUserItineraries.getUserItineraries);
router.post('/getUserItinerary', getUserItinerary.getUserItinerary);
router.post('/createItinerary', createItinerary.createItinerary);
router.post('/deleteItinerary', deleteItinerary.deleteItinerary);

module.exports = router;