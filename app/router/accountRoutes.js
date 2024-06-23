const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');

router.post('/accounts', accountController.createAccount);
router.get('/accounts', accountController.getAccounts);
router.put('/accounts/:id', accountController.updateAccount);
router.delete('/accounts/:id', accountController.deleteAccount);

module.exports = router;