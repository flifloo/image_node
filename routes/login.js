let router = require("express").Router();
let fs = require("fs");
let passwordHash = require('password-hash');


router.get("/", (req, res) => {
	if (req.session.login) {
		res.redirect("/");
	} else {
		let fail = false;
		if ("fail" in req.query) {
			fail = true;
		}
		let path = null;
		if ("path" in req.query) {
			path = req.query.path;
		}
		res.render("login", {title: "login", fail: fail, path: path, session: req.session});
	}
});

router.post("/", (req, res) => {
	if ("username" in req.body && "password" in req.body) {
		file = JSON.parse(fs.readFileSync("users.json"));
		if (req.body.username in file && passwordHash.verify(req.body.password, file[req.body.username])) {
			req.session.login = true;
			req.session.username = req.body.username;
			req.session.save();
			if ("path" in req.query) {
				res.redirect(req.query.path);
			} else {
				res.redirect("/");
			}
		} else {
			res.redirect("/login?fail");
		}
	} else {
		res.redirect("/login?fail");
	}
});


module.exports = router;

