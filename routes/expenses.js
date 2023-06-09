const express = require('express');

const expenseController = require('../controllers/expenses')
const userauthentication = require('../middleware/auth')

const router = express.Router();

router.post('/addexpense', userauthentication.authenticate,  expenseController.addexpense );

router.get('/getexpenses', userauthentication.authenticate ,  expenseController.getexpenses );

router.delete('/deleteexpense/:expenseid', userauthentication.authenticate , expenseController.deleteexpense);

router.post('/editexpenses/:id', userauthentication.authenticate,  expenseController.editexpenses );


module.exports = router;


/*const express = require('express');

const expensesActionsController=require('../controllers/expenses');
const userauthentication = require('../middleware/auth')


const router = express.Router();



router.post('/add-expenses',userauthentication.authenticate, expensesActionsController.postAddExpenses);
router.get('/get-expenses',userauthentication.authenticate,expensesActionsController.getExpenses);
router.delete('/delete-expenses/:id',userauthentication.authenticate,expensesActionsController.deleteExpenses);
router.post('/edit-expenses/:id',userauthentication.authenticate,expensesActionsController.editExpenses);


module.exports = router;
*/