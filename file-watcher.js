const fs = require('fs');
const testPrompter = require('./tester-prompt.js');
const spawn = require('child_process').spawn;

//async () => { await testPrompter.promptForRun() };

async function start() {
	await testPrompter.promptForRun();
	console.log('File to Run: ', testPrompter.fileToRun);
	console.log('Files to Watch: ', testPrompter.filesToWatch);
};

start();

// Run this file (typically a test file) from the first command line argument
// file path when any of the remaining command line argument file paths are changed.
let fileToRun = process.argv[2]; 
console.log('Test File: ' , fileToRun);

const watcher = (filePath) => {
	const file = fs.readFileSync(filePath);

	fs.watchFile(filePath, (event, filename) => {
		if(filename){
			console.log('========== ' + event + ' to ' + filename + ' ===========');
			spawn(`node`, [fileToRun], { stdio: 'inherit' });
		}else{
			console.error('File name not provided!');
		}
	});
}

// If there are man files to watch loop over and create a new watcher for each one.
for(let i = 2; i <= process.argv.length - 1; i++){
	console.log('New watcher for: ', process.argv[i]);
	watcher(process.argv[i]);
}
