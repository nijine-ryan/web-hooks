const express = require('express');
const router = express.Router();
const dataHandlerController = require('../controllers/DataHandlingController');

router.post('/server/incoming_data', dataHandlerController.handleIncomingData);

module.exports = router;
