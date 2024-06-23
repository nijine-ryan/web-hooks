const express = require('express');
const accountRoutes = require('./accountRoutes');
const destinationRoutes = require('./destinationRoutes');
const dataHandlerRoutes = require('./dataHandlingRoutes');
const accountController = require('../controllers/AccountController');
const dataHandlerController = require('../controllers/DataHandlingController');
const destinationController = require('../controllers/DestinationController');

const router = express.Router();

// router.use('/accounts', accountRoutes);
// router.use('/destinations', destinationRoutes);
// router.use('/datahandler', dataHandlerRoutes);

router.post('/accounts', accountController.createAccount);
router.get('/accounts', accountController.getAccounts);
router.put('/accounts/:id', accountController.updateAccount);
router.delete('/accounts/:id', accountController.deleteAccount);


router.post('/destinations', destinationController.createDestination);
router.get('/destinations/:accountId', destinationController.getDestinationsByAccountId);
router.put('/destinations/:id', destinationController.updateDestination);
router.delete('/destinations/:id', destinationController.deleteDestination);

router.post('/server/incoming_data', dataHandlerController.handleIncomingData);

module.exports = router;