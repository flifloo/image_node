let readline = require("readline")
let fs = require("fs");
let passwordHash = require('password-hash');


function getFile() {
	if (fs.existsSync("users.json")) {
		file = JSON.parse(fs.readFileSync("users.json"));
	} else {
		fs.writeFileSync("users.json", "{}");
		file = {};
	}
	return file;
}

function getReadLine() {
	return readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
}

async function getUsername() {
	let rl = getReadLine();
	let username;
	let file = getFile();
	while (true) {
		username = await new Promise(resolve => rl.question("Username: ", resolve));
		if (username in file || ["", null].indexOf(username) >= 0)
			console.error("Invalid username !");
		else
			break;
	}
	rl.close();
	return username;
}

async function getPassword() {
	let rl = getReadLine();
	let password = await new Promise(resolve => rl.question("Password: ", resolve));
	rl.close();
	return password;
}

function setUser(username, password) {
	let file = getFile();
	file[username] = passwordHash.generate(password);
	fs.writeFileSync("users.json", JSON.stringify(file));
	console.log("User " + username + " set");
}

async function addUser() {
	setUser(await getUsername(), await getPassword());
}

function delUser(username) {
	let file = JSON.parse(fs.readFileSync("users.json"));
	if (username in file) {
		delete file[username];
		fs.writeFileSync("users.json", JSON.stringify(file));
		console.log("User " + username + " deleted");
		return 0;
	} else {
		console.error("Username not found !");
		return 1;
	}
}

function isAuth(req, res, next) {
	if (req.session.login) {
		next();
	} else {
		res.redirect("/login?path=" + req.originalUrl);
	}
}


module.exports = {
	getFile: getFile,
	getUsername: getUsername,
	getPassword: getPassword,
	setUser: setUser,
	addUser: addUser,
	delUser: delUser,
	isAuth: isAuth
};

