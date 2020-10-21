const express = require("express");
const mongoose = require("mongoose");
const shoppingModel = require("../models/shoppingitem");

let router = express.Router();

// databases

let database = [];
let id = 500;

// REST API
router.get("/shopping", function (req, res) {
    let query = { "user": req.session.user }
    shoppingModel.find(query, function (err, items) {
        if (err) {
            console.log("Failed to find shoppingitems");
            return res.status(404).json({ message: "not found" })
        }
        if (!items) {
            return res.status(200).json([])
        }
        return res.status(200).json(items)
    })
    //let tempDatabase = database.filter(item => item.user === req.session.user)
    //return res.status(200).json(database);
})

router.post("/shopping", function (req, res) {
    if (!req.body) {
        return res.status(422).json({ message: "Please enter proper information" })
    }
    if (!req.body.type) {
        return res.status(422).json({ message: "please enter proper information" })
    }

    let item = new shoppingModel({
        id: id,
        type: req.body.type,
        count: req.body.count,
        price: req.body.price,
        user: req.session.user
    })
    item.save(function (err) {
        if (err) {
            console.log("Failed to save item");
            return res.status(409) - json({ message: "failed to save item" })

        }
        return res.status(200).json({ message: "success" })
    })
})

router.delete("/shopping/:id", function (req, res) {
    let query = { "_id": req.params.id, "user": req.session.user }
    shoppingModel.deleteOne(query, function (err, item) {
        if (err) {
            console.log("Failed to remove item. Reason:", err);
            return res.status(409).json({ message: "conflict" })
        }
        if (!item) {
            return res.status(404).json({ message: "not found" })
        }
        return res.status(200).json({ message: "success" })
    })
})
router.put("/shopping/:id", function (req, res) {
    if (!req.body) {
        return res.status(422).json({ message: "Please enter proper information" })
    }
    if (!req.body.type) {
        return res.status(422).json({ message: "Please enter proper information" })
    }
    let newItem = {
        type: req.body.type,
        count: req.body.count,
        price: req.body.price,
        user: req.session.user
    }
    let query = { "_id": req.params.id, "user": req.session.user }
    shoppingModel.replaceOne(query, newItem, function (err, item) {
        if (err) {
            console.log("Failed to remove item. Reason:", err);
            return res.status(409).json({ message: "conflict" })
        }
        if (!item) {
            return res.status(404).json({ message: "not found" })
        }
        return res.status(200).json({ message: "success" })
    })
})


module.exports = router;
