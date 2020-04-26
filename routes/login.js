let router = require("express").Router();
let fs = require("fs");
let passwordHash = require('password-hash');


router.get("/", (req, res) => {
	let fail = false;
	if ("fail" in req.query) {
		fail = true;
	}
	res.render("login", {title: "login", fail: fail});
});

router.post("/", (req, res) => {
	if ("username" in req.body && "password" in req.body) {
		file = JSON.parse(fs.readFileSync("users.json"));
		if (req.body.username in file && passwordHash.verify(req.body.password, file[req.body.username])) {
			req.session.login = true;
			req.session.save();
			res.redirect("/");
		} else {
			res.redirect("/login?fail");
		}
	} else {
		res.redirect("/login?fail");
	}
});


module.exports = router;
