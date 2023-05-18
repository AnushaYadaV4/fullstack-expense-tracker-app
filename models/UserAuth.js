const Sequelize = require('sequelize');
const sequelize = require('../helper/database');
const UserAuth = sequelize.define('userauth',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name:{ 
      type:Sequelize.STRING,
      unique:false,
    },
   
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password:{
        type: Sequelize.STRING,
        unique: false,

    }
  });

module.exports = UserAuth;