let yargs = require("yargs");
let user = require("./user");

yargs.scriptName("node cli.js")
	.command("adduser [username] [password]", "Add user", (yargs) => {
		yargs.positional("username", {
			describe: "Username for the new user",
			type: "string"
		}).positional("password", {
			describe: "The user password",
			type: "string"
		});
	}, async (argv) => {
		if (!("username" in argv))
			argv.username = await user.getUsername();
		else if (argv.username in user.getFile()) {
			console.error("Invalid username !");
			process.exit(1);
		}
		if (!("password" in argv))
			argv.password = await user.getPassword();
		user.setUser(argv.username, argv.password);
		process.exit(0);
	})
	.command("deluser <username>", "Remove user", (yargs) => {
		yargs.positional("username", {
			type: "string",
			describe: "The user to remove"
		});
	}, async (argv) => {
		process.exit(user.delUser(argv.username));
	})
	.help()
	.alias("h", "help")
	.argv;

