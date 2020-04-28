let router = require("express").Router();


router.get("/", (req, res) => {
	req.session.login = false;
	req.session.save();
	res.redirect("/login");
});


module.exports = router;

