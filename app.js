let express = require("express");
let morgan = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require('body-parser');
let session = require("express-session");
let fs = require("fs");
let passwordHash = require('password-hash');

let app = express();

if (!fs.existsSync("users.json")) {
	fs.writeFileSync("users.json", "{}");
	console.log("Register first user");
	addUser();
} else if (Object.keys(JSON.parse(fs.readFileSync("users.json"))).length === 0) {
	console.log("No user found, adding a new one");
	addUser();
}

async function addUser() {
	let rl = require("readline").createInterface({input: process.stdin, output: process.stdout, terminal: false});
	let username;
	let password;
	file = JSON.parse(fs.readFileSync("users.json"));
	do {
		username = await new Promise(resolve => rl.question("Username: ", resolve));
	} while (username in file || ["", null].indexOf(username) >= 0);
	password = passwordHash.generate(await new Promise(resolve => rl.question("Password: ", resolve)));
	file[username] = password;
	fs.writeFileSync("users.json", JSON.stringify(file));
}


function isAuth(req, res, next) {
	if (req.session.login) {
		next();
	} else {
		res.redirect("/login");
	}
}


app.use(morgan("dev"))
	.use(express.static("public"))
	.use(bodyParser.urlencoded({ extended: true }))
	.use(cookieParser())
	.use(session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: "auto" }
	}))
	.set("trust proxy", 1)
	.set("view engine", "pug")
	.get("/", isAuth, (req, res) => {
		res.render("index");
	})
	.get("/login", (req, res) => {
		let fail = false;
		if ("fail" in req.query) {
			fail = true;
		}
		res.render("login", {title: "login", fail: fail});
	}).post("/login", (req, res) => {
		if ("username" in req.body && "password" in req.body) {
			file = JSON.parse(fs.readFileSync("users.json"));
			if (req.body.username in file && passwordHash.verify(req.body.password, file[req.body.username])) {
				req.session.login = true;
				req.session.save();
				res.redirect("/");
			} else {
				res.redirect("/login?fail");
			}
		} else {
			res.redirect("/login?fail");
		}
	})
	.listen(8080);

