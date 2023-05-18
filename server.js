const express=require('express');
const cors=require('cors');
const app = express();
app.use(cors({
    origin:"*"
}))


const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userauth = require('./models/UserAuth');
var http = require('http');


const sequelize=require('./helper/database');
const authActionsRoutes=require('./routes/auth');

app.use(authActionsRoutes);

sequelize
.sync()
.then(result=>{
    console.log(result)
    console.log("DB CONNECTED")
    app.listen(5000,()=>console.log('server running...'));})
.catch(err=>{
    console.log(err);
});


