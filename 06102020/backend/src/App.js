const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log("Hi! I am a filter");
  return next();
})

let database = [];
let id = 500;

app.get("/api/shopping", function (req, res) {
  return res.status(200).json(database);
})

let port = process.env.PORT || 3001

app.listen(port);

console.log("Running in port:" + port);