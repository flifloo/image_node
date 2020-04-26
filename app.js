let express = require("express");
let morgan = require("morgan");
let fs = require("fs");
let rl = require("readline").createInterface({input: process.stdin, output: process.stdout, terminal: false});
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


app.use(morgan("dev"))
.use(express.static("public"))
.set("view engine", "pug")
.get("/", (req, res) => {
	res.render("index");
});

app.listen(8080)

