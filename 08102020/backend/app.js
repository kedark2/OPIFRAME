const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const config = require("./config/config");

let app = express();

//mongoose.connect("mongodb://localhost/databasename").then(
mongoose.connect("mongodb+srv://" + config.user + ":" + config.password + "@cluster0.z4m5x.mongodb.net/" + config.database + "?retryWrites=true&w=majority").then(
    () => console.log("Success in connection to mongodb"),
    (error) => console.log("Failed to connect to mongodb. Error:", error)
)

app.use(bodyParser.json());


//login databases

//let registeredUsers = [];
//let loggedSessions = [];
let ttl = 3600000;

//middleware
/*
isUserLogged = (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
        return res.status(403).json({ message: "forbidden" })
    }
    for (let i = 0; i < loggedSessions.length; i++) {
        if (token === loggedSessions[i].token) {
            let now = Date.now();
            if (now > loggedSessions[i].ttl) {
                loggedSessions.splice(i, 1);
                return res.status(403).json({ message: "forbidden" })
            }
            req.session = {};
            req.session.user = loggedSessions[i].user;
            loggedSessions[i].ttl = loggedSessions[i].ttl + ttl;
            return next();
        }
    }
    return res.status(403).json({ message: "forbidden" })
}
*/
isUserLogged = (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
        return res.status(403).json({ message: "forbidden" })
    }
    sessionModel.findOne({ "token": token }, function (err, session) {
        if (err) {
            console.log("Failed to find session. Reason:", err);
            return res.status(403).json({ message: "forbidden" })

        }
        if (!session) {
            console.log("No session registered for token");
            return res.status(403).json({ message: "forbidden" })
        }
        let now = Date.now();
        if (now > session.ttl) {
            sessionModel.deleteOne({ "_id": session._id }, function (err) {
                if (err) {
                    console.log("Failed to remove session. Reason:", err)
                }
                return res.status(403).json({ message: "forbidden" })
            })
        } else {
            req.session = {}
            req.session.user = session.user;
            session.ttl = now + ttl;
            session.save(function (err) {
                if (err) {
                    console.log("Failed to save session. Reason:", err)
                }
                return next();
            })
        }
    })
}
createToken = () => {
    const letters = "abcdefghijABCDEFGHIJ0123456789";
    let token = "";
    for (let i = 0; i < 128; i++) {
        let temp = Math.floor(Math.random() * 30);
        token = token + letters[temp];
    }
    return token;
}

//LOGIN API

app.post("/register", function (req, res) {
    if (!req.body) {
        return res.status(422).json({ message: "Please enter proper credentials" })
    }
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({ message: "Please enter proper credentials" })
    }
    if (req.body.username.length < 4 || req.body.password.length < 8) {
        return res.status(422).json({ message: "Username must be atleast 4 and password 8 characters long" })
    }
    let user = new userModel({
        username: req.body.username,
        password: req.body.password
    })
    user.save(function (err, user) {
        if (err) {
            console.log("Register failed, reason:" + err)
            return res.status(409).json({ message: "Username is already in use" })
        }
        return res.status(200).json({ message: "success" })
    })

})
/*

app.post("/login", function (req, res) {
    if (!req.body) {
        return res.status(422).json({ message: "Please enter proper credentials" })
    }
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({ message: "Please enter proper credentials" })
    }
    if (req.body.username.length < 4 || req.body.password.length < 8) {
        return res.status(422).json({ message: "Username must be atleast 4 and password 8 characters long" })
    }
    for (let i = 0; i < registeredUsers.length; i++) {
        if (req.body.username === registeredUsers[i].username) {
            if (req.body.password === registeredUsers[i].password) {
                let token = createToken();
                let tempttl = Date.now();
                let session = {
                    user: req.body.username,
                    ttl: tempttl + ttl,
                    token: token
                }
                loggedSessions.push(session);
                return res.status(200).json({ token: token })

            }
        }
    }
    return res.status(403).json({ message: "forbidden" })
})
*/


app.post("/login", function (req, res) {
    if (!req.body) {
        return res.status(422).json({ message: "Please enter proper credentials" })
    }
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({ message: "Please enter proper credentials" })
    }
    if (req.body.username.length < 4 || req.body.password.length < 8) {
        return res.status(422).json({ message: "Username must be atleast 4 and password 8 characters long" })
    }
    userModel.findOne({ "username": req.body.username }, function (err, user) {
        if (err) {
            return res.status(422).json({ message: "Please enter proper credentials" })

        } if (!user) {
            return res.status(422).json({ message: "Please enter proper credentials" })
        }
        let token = createToken();
        let now = Date.now();
        let session = new sessionModel({
            user: req.body.username,
            ttl: now + ttl,
            token: token
        })
        session.save(function (err) {
            if (err) {
                console.log("Session creation failed:", err)
                return res.status(422).json({ message: "Please enter proper credentials" })

            }
            return res.status(200).json({ token: token })
        })

    })
})

app.post("/logout", function (req, res) {
    let token = req.headers.token;
    if (!token) {
        return res.status(404).json({ message: "not found" })
    }
    sessionModel.deleteOne({ token: token }, function (err) {
        if (err) {
            console.log("Failed to remove session while logging out")
        }
        return res.status(200).json({ message: "success" })
    })
})

app.use("/api", isUserLogged, apiroutes);


let port = process.env.PORT || 3001

app.listen(port);

console.log("Running in port:" + port);