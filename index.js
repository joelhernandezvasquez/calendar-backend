const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config()

// create the express server
const app = express();

// Database
 dbConnection();

 // CORS
 //app.use(cors);

// public directory

// this a middleware. A middleware is a function that gets executed when a request is made to the server.

app.use(express.static('public'));

// reading and parsing the body

app.use(express.json())

// Routes
 app.use('/api/auth',require('./routes/auth'));
 app.use('/api/events',require('./routes/events'));

// listen to request

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port: ${process.env.PORT}`)
});


