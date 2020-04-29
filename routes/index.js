let router = require("express").Router();
let isAuth = require("../user").isAuth;
let fs = require("fs");


router.get("/", isAuth, (req, res) => {
	let invalidType = false;
	if ("invalidType" in req.query) {
		invalidType = true;
	}
	res.render("index", {
		invalidType: invalidType,
		session: req.session,
		count: fs.readdirSync("./images/").length
	});
});


module.exports = router;

