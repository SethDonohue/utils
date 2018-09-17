const fs = require('fs');
const exec = require('child_process').exec;

const filePath = process.argv[2];
const testFilePath = process.argv[3];
const file = fs.readFileSync(filePath);

console.log('File: ', file);
console.log('Test File: ' , testFilePath);

fs.watch(filePath, (event, filename) => {
	if(filename){
		console.log('========== ' + event + ' to ' + filename + ' ===========');
		// Run the test file...
		exec(`node ` + testFilePath, (error, stdout, stderr) => {
			console.log('stdout: ', stdout);
		});
	}else{
		console.error('File name not provided!');
	}
});
