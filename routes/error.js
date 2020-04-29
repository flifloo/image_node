module.exports = (err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render("error", {session: req.session});
}

