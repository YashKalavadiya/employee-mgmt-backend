//importing express for routing and listening at port
const express = require('express');
//creates an express application
const app = express();

const serverless = require('serverless-http');

//importing firebase
const firebase = require('firebase')
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBe2-GBVQaGv7lLHqIa7esgW9bYHhJpks8",
    authDomain: "employeemgmt-be44c.firebaseapp.com",
    databaseURL: "https://employeemgmt-be44c.firebaseio.com",
    projectId: "employeemgmt-be44c",
    storageBucket: "employeemgmt-be44c.appspot.com",
    messagingSenderId: "943686472810",
    appId: "1:943686472810:web:570409b7c53c4e36eae613",
    measurementId: "G-YEMNFJ6MEH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//importing bodyparser
const bodyparser = require('body-parser');

//importing CORS
const cors = require('cors');


//importing auth routes present in auth.js file
const authRoutes = require('./routes/auth');  
const employeeRoutes = require('./routes/employee')

//using body-parser to parse http request
app.use(bodyparser.json());

//using CORS to enable cross-domain request
//app.use(cors());

//adding a middleware to solve problem of cross origin and make api public
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

//using authRouter which will be accesed by /auth/__route_in_auth.js__
app.use("/auth", authRoutes);


//using employee routes which will be accessed by /employees/__route_in_employee.js__
app.use("/employees", employeeRoutes);



module.exports = app;

module.exports.handler = serverless(app);


// //listening at port 2000 or if port is defined in .env file
// const port = 2000 || process.env.PORT
// app.listen(port, () => {
//     console.log(`App is listening at port ${port}`);
// })
