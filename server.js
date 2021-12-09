// Setup empty JS object to act as endpoint for all routes
projectData = {};

// packages needed
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// port
const port = 8000;

// Express to run server and routes
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// handle route GET method
app.get("/getData", (req, res) => {
  res.send(projectData);
});

// handle route POST method
app.post("/postData", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    name: req.body.content.name,
    content: {
      ...req.body.content,
    },
  };
  res.send("Posted Seccessfully");
});
