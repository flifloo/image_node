let router = require("express").Router();
let isAuth = require("../user").isAuth;
let fs = require("fs");


router.get("/", isAuth, (req, res, next) => {
	let images = fs.readdirSync("./images/");
	res.render("list", {images: images});
});


module.exports = router;

