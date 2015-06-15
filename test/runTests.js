var command, mochaProcess;

command = "mocha test/tests/";
mochaProcess = require('child_process').exec(command, [], { env: process.env });
mochaProcess.stdout.pipe(process.stdout);
mochaProcess.stderr.pipe(process.stderr);
mochaProcess.on('close', function (code) {
	process.exit(code);
});