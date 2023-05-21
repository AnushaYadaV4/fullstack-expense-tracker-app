const Sequelize = require('sequelize');
const sequelize = require('../helper/database');
const UserExpenses = sequelize.define('userexpenses',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    amount:{ 
      type:Sequelize.INTEGER,
      unique:false,
    },
   
    category: {
      type: Sequelize.STRING,
      unique: false,
    },
    description:{
        type: Sequelize.STRING,
        unique: false,

    }
  });

module.exports = UserExpenses;