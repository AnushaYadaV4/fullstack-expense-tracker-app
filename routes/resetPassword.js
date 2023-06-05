const express=require('express');
//const userauthentication = require('../middleware/auth')
const router=express.Router()

const resetPasswordController=require('../controllers/resetPassword');
router.get('/updatepassword/:resetpasswordid', resetPasswordController.updatepassword)



router.get('/resetpassword/:id', resetPasswordController.resetpassword);

router.use('/forgotpassword',resetPasswordController.forgotpassword);


module.exports=router;

