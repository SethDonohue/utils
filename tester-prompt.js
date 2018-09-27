const readline = require('readline');
const testPrompter = {
	fileToRun: '',
	filesToWatch: [],
};

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});


testPrompter.promptForWatch = () => {
	rl.question('Enter file path to WATCHED file or "q" to begin watching: ', answer => {
		switch (answer){
			case 'q':
			case 'w':
				rl.pause();
				break;
			default:
				console.log('Added to WATCHED files: ', answer);
				testPrompter.filesToWatch.push(answer);
				testPrompter.promptForWatch();
		}
	});
}

testPrompter.promptForRun = () => {
	return new Promise(resolve => {
		rl.question('Please enter path for file to RUN on watched file(s) changes: ', answer => {
			console.log('Set as File to RUN: ', answer);
			testPrompter.fileToRun = answer;
			console.log('Type in a file path to watch it. \n Type "q" or "w" at anytime to begin file watching...');
			testPrompter.promptForWatch();
		});
	});
}

module.exports = testPrompter;
