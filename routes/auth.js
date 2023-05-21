const express = require('express');

const authActionsController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authActionsController.signup);
router.post('/login', authActionsController.login);
router.get('/getSignupDetails',authActionsController.getSignupDetails);



module.exports = router;