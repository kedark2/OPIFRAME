const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/hello/:name", function (req, res) {
    console.log(req);
    let name = req.params.name;
    let hello = "Hello " + name;
    return res.status(200).json({ "message": "Hello world!!" })
});

app.listen(3000);

console.log("Running in port 3000");