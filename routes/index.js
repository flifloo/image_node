let router = require("express").Router();
let isAuth = require("../user").isAuth;


router.get("/", isAuth, (req, res) => {
	res.render("index");
});


module.exports = router;

