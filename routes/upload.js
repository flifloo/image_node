let router = require("express").Router();
let isAuth = require("../user").isAuth;
let multer = require("multer");
let crypto = require("crypto");
let path = require("path");

let storage = multer.diskStorage({
	destination: './images/',
	filename: (req, file, cb) => {
		crypto.pseudoRandomBytes(16, (err, raw) => {
			if (err) return cb(err)
			cb(null, raw.toString('hex') + path.extname(file.originalname));
		});
	}
});
let upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype.substring(0, 6) !== "image/") {
			req.fileErrorValidation = true;
			return cb(null, false, new Error("Wrong file type"));
		}
		cb(null, true);
	}
});


router.post("/", isAuth, upload.single("image"), (req, res) => {
	if (req.fileErrorValidation) {
		res.redirect("/?invalidType");
	} else {
		res.redirect("/images/" + req.file.filename);
	}
});


module.exports = router;

