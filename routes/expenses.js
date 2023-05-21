const express = require('express');

const expensesActionsController=require('../controllers/expenses');

const router = express.Router();



router.post('/add-expenses',expensesActionsController.postAddExpenses);
router.get('/get-expenses',expensesActionsController.getExpenses);
router.delete('/delete-expenses/:id',expensesActionsController.deleteExpenses);
router.post('/edit-expenses/:id',expensesActionsController.editExpenses);


module.exports = router;