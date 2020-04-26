let router = require("express").Router();
let fs = require("fs");


router.get("/:name", (req, res, next) => {
	if ("name" in req.params && fs.existsSync("./images/"+req.params.name)) {
		res.sendfile("./images/"+req.params.name);
	} else {
		next();
	}
});


module.exports = router;

