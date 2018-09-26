process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', text => {
	console.log('Recieved data: ', util.inspect(text));
	if(text === 'quit\r\n'){
		done();
	}
});

const done = () => {
	console.log('Stdin Paused.');
	process.exit();
}
