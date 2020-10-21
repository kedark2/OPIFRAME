const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes");
const mongoose = require("mongoose")
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const config = require("./config/config");
const bcrypt = require("bcrypt");

let app = express();

mongoose.connect("mongodb://localhost/shoppingappdatabase").then(
	//mongoose.connect("mongodb+srv://"+config.user+":"+config.password+"@mycluster.ujjvo.mongodb.net/"+config.database+"?retryWrites=true&w=majority").then(
	() => console.log("Success in connecting to mongodb"),
	(error) => console.log("Failed to connect to mongodb. Error:", error)
)

app.use(bodyParser.json());

let ttl = 3600000;

//middleware

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
			req.session = {};
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
	bcrypt.hash(req.body.password, 16, function (err, hash) {
		if (err) {
			console.log("Failed to hash password:", err);
			return res.status(422).json({ message: "Please enter proper credentials" })
		}
		let user = new userModel({
			username: req.body.username,
			password: hash
		})
		user.save(function (err, user) {
			if (err) {
				console.log("Register failed, reason:" + err);
				return res.status(409).json({ message: "Username is already in use" })
			}
			return res.status(200).json({ message: "success" })
		})
	})
})

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
			return res.status(409).json({ message: "conflict" })
		}
		if (!user) {
			return res.status(422).json({ message: "Please enter proper credentials" })
		}
		bcrypt.compare(req.body.password, user.password, function (err, success) {
			if (err) {
				console.log("Failed to compare passwords", err);
				return res.status(409).json({ message: "conflict" });
			}
			if (!success) {
				return res.status(403).json({ message: "forbidden" });
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
					return res.status(409).json({ message: "conflict" })
				}
				return res.status(200).json({ token: token })
			})
		})
	})
})


app.post("/logout", function (req, res) {
	let token = req.headers.token;
	if (!token) {
		return res.status(404).json({ message: "not found" })
	}
	sessionModel.deleteOne({ token: token }, function (err, session) {
		if (err) {
			console.log("Failed to remove session while logging out")
		}
		if (!session) {
			return res.status(404).json({ message: "not found" })
		}
		return res.status(200).json({ message: "success" })
	})
})

app.use("/api", isUserLogged, apiroutes);


let port = process.env.PORT || 3001

app.listen(port);

console.log("Running in port:" + port);