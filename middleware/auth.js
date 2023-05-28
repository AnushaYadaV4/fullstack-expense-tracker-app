const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log("Tokennnnn",token);
        const user = jwt.verify(token, 'secretkey');
        console.log("USERRRR",user)
        console.log('userID >>>> ', user.userId);
        console.log('YAHOOOOO!!!! YOR ARE AUTHORIZED');
        User.findByPk(user.userId).then(user => {

            req.user = user; ///ver
            next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false,message:"user is unauthorized"});
        // err
      }

}

module.exports = {
    authenticate
}