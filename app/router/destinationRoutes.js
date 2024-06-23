const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/DestinationController');

router.post('/destinations', destinationController.createDestination);
router.get('/destinations/:accountId', destinationController.getDestinationsByAccountId);
router.put('/destinations/:id', destinationController.updateDestination);
router.delete('/destinations/:id', destinationController.deleteDestination);

module.exports = router;