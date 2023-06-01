const express=require('express');
const cors=require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin:"*"
}))


const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require('./models/users');


const UserExpenses=require('./models/userexpenses');
const Order = require('./models/orders');

var http = require('http');


const sequelize=require('./helper/database');

const authActionsRoutes=require('./routes/user');
const expenseActionRoutes=require('./routes/expenses');
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes=require('./routes/premiumFeature');


app.use(authActionsRoutes);
app.use(expenseActionRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium',premiumFeatureRoutes);

User.hasMany(UserExpenses);
UserExpenses.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
.sync()
.then(result=>{
    console.log(result)
    console.log("DB CONNECTED")
    app.listen(5000,()=>console.log('server running...'));})
.catch(err=>{
    console.log(err);
});


