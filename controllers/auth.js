const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserAuth = require("../models/UserAuth");

// Function to generate a JWT token
const generateToken = (user) => {
    const payload = {
      user: {
        id: user.id,
      },
    };
  
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
  };

  // Route: POST /api/signup
exports.signup = async (req, res) => {
    const { name,email, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await UserAuth.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await UserAuth.create({
        name,
        email,
        password: hashedPassword,
      });
  
      // Generate a JWT token
      const token = generateToken(newUser);
  
      // Return the token
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  // Route: POST /api/login
exports.login = async (req, res) => {
    const { name,email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await UserAuth.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = generateToken(user);
  
      // Return the token
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
















/*exports.postAddAuthDetails = async (request, response, next) => {

    const userId = request.body.id;
    console.log("userrrrrId",userId)
    try {
        if (!request.body.name || !request.body.email || !request.body.password) {
            throw new Error("all fields are required");
        }

        UserAuth.findAll().then(users=>{
            console.log("Usersssssss",users)
            console.log("users email",users.email)
            
        }).catch(err=>console.log(err))
        

    
        const name = request.body.name;
        const email = request.body.email;
        const password = request.body.password;
        const data = await UserAuth.create({
            name:name,
            email:email,
            password:password
           
           
        });
        console.log(data)

        response.status(201).json({ newUserDetails: data })
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: err })
    }

}
*/
