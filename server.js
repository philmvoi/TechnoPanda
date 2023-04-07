const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const bodyParser =  require('body-parser')
const mysql = require('mysql');
const app = express();

//initialize sequilize
const Sequilize =require('sequelize');
const db = new Sequilize('capstone_schema', 'root', 'qpalzm10', {
  host: 'localhost',
  dialect: 'mysql',
  insecureAuth: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error ' + err))