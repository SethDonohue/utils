const fs = require('fs');
//const testPrompter = require('./tester-prompt.js');
const spawn = require('child_process').spawn;
const prompter = require('./prompter.js');

let fileToRun = '';
let filesToWatch = [];

async function startPrompt() {
	//const results = await testPrompter.promptForRun();
	const results = await prompter();
	//console.log('File to Run: ', testPrompter.fileToRun, '\nFiles to Watch: ', testPrompter.filesToWatch);
	//console.log('File to Run: ', results.fileToRun, '\nFiles to Watch: ', results.filesToWatch);
	return results;
};

if(!process.argv[2]){
	return startPrompt()
		.then(results => {
			fileToRun = results.fileToRun;
			filesToWatch = results.filesToWatch;
			console.log('Runner File: ', fileToRun);
			console.log('Watched Files: ', filesToWatch);
			return;
		})
		.then(console.log('HIT END'));
} else {
 fileToRun = process.argv[2]; 
}

console.log('Test File: ' , fileToRun);

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

// If there are man files to watch loop over and create a new watcher for each one.
for(let i = 2; i <= process.argv.length - 1; i++){
	console.log('New watcher for: ', process.argv[i]);
	watcher(process.argv[i]);
}
