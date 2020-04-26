let express = require("express");
let morgan = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require('body-parser');
let session = require("express-session");
let fs = require("fs");
let addUser = require("./user").addUser;

let indexRoute = require("./routes/index");
let uploadRoute = require("./routes/upload");
let loginRoute = require("./routes/login");
let imagesRoute = require("./routes/images");
let notFoundRoute = require("./routes/notFound");
let errorRoute = require("./routes/error");

let app = express();


if (!fs.existsSync("users.json")) {
	fs.writeFileSync("users.json", "{}");
	console.log("Register first user");
	addUser();
} else if (Object.keys(JSON.parse(fs.readFileSync("users.json"))).length === 0) {
	console.log("No user found, adding a new one");
	addUser();
}


app.use(morgan("dev"))
	.use(express.static("public"))
	.use(bodyParser.urlencoded({ extended: true }))
	.use(cookieParser(process.env.SECRET))
	.use(session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: "auto" }
	}))
	.set("trust proxy", 1)
	.set("view engine", "pug")
	.use("/", indexRoute)
	.use("/upload", uploadRoute)
	.use("/login", loginRoute)
	.use("/images", imagesRoute)
	.use(notFoundRoute)
	.use(errorRoute)
	.listen(8080);

