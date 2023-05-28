const express=require('express');
const cors=require('cors');
const app = express();
app.use(cors({
    origin:"*"
}))


const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require('./models/users');


const UserExpenses=require('./models/userexpenses');
var http = require('http');


const sequelize=require('./helper/database');
const authActionsRoutes=require('./routes/user');
const expenseActionRoutes=require('./routes/expenses');


app.use(authActionsRoutes);
app.use(expenseActionRoutes)

User.hasMany(UserExpenses);
UserExpenses.belongsTo(User);

sequelize
.sync()
.then(result=>{
    console.log(result)
    console.log("DB CONNECTED")
    app.listen(5000,()=>console.log('server running...'));})
.catch(err=>{
    console.log(err);
});


