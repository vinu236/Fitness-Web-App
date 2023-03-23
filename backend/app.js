//! Load environment variables from .env file
require('dotenv').config();

//! Import Dependencies
const express =require('express');
const cors=require("cors")
//!importing Routes 
const userRoutes=require('./routes/userRoutes');
const adminRoutes=require('./routes/adminRoutes');
const trainerRoutes=require("./routes/trainerRoutes")
//!importing config DB
const DB=require("./config/connection") 

//!importing error handling middleware
const errorHandler=require("./middleware/errorHandler");

//! Create Express App
const app=express();

//! Parse incoming request bodies as Json or URL-encoded Data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  };


  // !enables Cross-Origin Resource Sharing (CORS) for the server(otherwise browser prevent the request)
  app.use(cors(corsOptions));
  
//! Mount routes
app.use(userRoutes);
app.use(adminRoutes);
app.use(trainerRoutes);

//!handle any errors that occur during the processing of incoming requests.
app.use(errorHandler);



//!Server starting and Connecting to Port 
app.listen(process.env.PORT,()=>{
    console.log(`Server connected to port ${process.env.PORT}`)
});

// !Connecting DataBase
DB();