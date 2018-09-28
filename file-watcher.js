const fs = require('fs');
const spawn = require('child_process').spawn;
const prompter = require('./prompter.js');

let fileToRun = '';
let filesToWatch = [];

async function startPrompt() {
	const results = await prompter();
	return results;
};

function startPrompt2() {
	return new Promise( resolve => resolve(prompter()));
};

const watcher = (filePath) => {
	const file = fs.readFileSync(filePath);

	fs.watchFile(filePath, {interval: 250 }, (event, filename) => {
		if(filename){
			console.log('========== ' + event + ' to ' + filename + ' ===========');
			spawn(`node`, [fileToRun], { stdio: 'inherit' });
		}else{
			console.error('File name not provided!');
		}
	});
}

if(!process.argv[2]){
	//startPrompt()
	return prompter()
		.then(results => {
			fileToRun = results.fileToRun;
			filesToWatch = results.filesToWatch;
			console.log('Runner File: ', fileToRun);
			console.log('Watched Files: ', filesToWatch);
			process.stdin.pause();
			//results;
		})
	//	.then(console.log('HIT END'));
} else {
	fileToRun = process.argv[2];
	filesToWatch = process.argv.slice(3, process.argv.length);
}

console.log('Test File: ' , fileToRun);

// If there are man files to watch loop over and create a new watcher for each one.
for(let i = 2; i <= filesToWatch - 1; i++){
	console.log('New watcher for: ', filesToWatch[i]);
	watcher(filesToWatch[i]);
}
