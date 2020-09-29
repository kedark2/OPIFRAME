const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use("/", express.static("public"));

app.use(bodyParser.json());

//Database
let database = [];
let id = 100;

// REST API 
//GET /api/shopping <- hae kaikki
//POST /api/shopping <- lisää uusi ostos
//DELETE /api/shopping/:id <- poista idllä varustettu ostos

app.get("/api/shopping", function (req, res) {
    return res.status(200).json(database);
})

app.post("/api/shopping", function (req, res) {
    console.log("invoked post api function")
    let item = {
        id: id,
        type: req.body.type,
        count: req.body.count,
        price: req.body.price
    }
    id++;
    database.push(item);
    console.log(database);
    return res.status(200).json({ message: "success" })
})

app.delete("/api/shopping/:id", function (req, res) {
    console.log("invoked delete api function");
    let tempId = parseInt(req.params.id, 10);
    database = database.filter((item) => item.id !== tempId);
    return res.status(200).json({ message: "success" });

})

app.listen(3000);

console.log("Running on port 3000")
