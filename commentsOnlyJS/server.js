// Setup empty JS object to act as endpoint for all routes
const data = {};
// port
const port = 8000;

// Express to run server and routes
const express = require("express");
const app = express();
// Start up an instance of app

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded(false));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");

app.use(cors());

// Initialize the main project folder

app.use(express.static("website"));

// Spin up the server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// handle route GET method
app.get("/getData", (req, res) => {
  if (req.body) {
    res.send(data);
  }
});

// handle route POST method
app.post("/postData", (req, res) => {
  data = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
});

// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
