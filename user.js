let fs = require("fs");
let passwordHash = require('password-hash');


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
		res.redirect("/login?path=" + req.originalUrl);
	}
}


module.exports.addUser = addUser;
module.exports.isAuth = isAuth;

