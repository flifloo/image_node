let express = require("express");
let morgan = require("morgan")
let app = express();

app.use(morgan("dev"))
.use(express.static("public"))
.set("view engine", "pug")
.get("/", (req, res) => {
	res.render("index");
});

app.listen(8080)

