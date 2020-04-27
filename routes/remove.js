let router = require("express").Router();
let isAuth = require("../user").isAuth;
let fs = require("fs");


router.get("/:name", isAuth, (req, res, next) => {
	if ("name" in req.params && fs.existsSync("./images/"+req.params.name)) {
		fs.unlinkSync("./images/"+req.params.name);
		res.redirect("/");
	} else {
		next();
	}
});


module.exports = router;

