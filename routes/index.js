let router = require("express").Router();
let isAuth = require("../user").isAuth;


router.get("/", isAuth, (req, res) => {
	let invalidType = false;
	if ("invalidType" in req.query) {
		invalidType = true;
	}
	res.render("index", {invalidType: invalidType});
});


module.exports = router;

