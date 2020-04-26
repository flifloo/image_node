let router = require("express").Router();


router.use((req, res) => {
	res.status(404);
	res.render("404", {url: req.path});
});


module.exports = router

