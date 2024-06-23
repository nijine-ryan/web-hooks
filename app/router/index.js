const express = require('express');
const accountRoutes = require('./accountRoutes');
const destinationRoutes = require('./destinationRoutes');
const dataHandlerRoutes = require('./dataHandlingRoutes');

const router = express.Router();

router.use('/accounts', accountRoutes);
router.use('/destinations', destinationRoutes);
router.use('/datahandler', dataHandlerRoutes);

module.exports = router;