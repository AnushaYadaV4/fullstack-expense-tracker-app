const express = require('express');

const authActionsController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authActionsController.signup);
router.post('/login', authActionsController.login);


module.exports = router;