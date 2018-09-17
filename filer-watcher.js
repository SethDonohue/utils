const fs = require('fs');
const spawn = require('child_process').spawn;

const filePath = process.argv[2];
const testFilePath = process.argv[3];
const file = fs.readFileSync(filePath);

console.log('Test File: ' , testFilePath);

fs.watch(filePath, (event, filename) => {
	if(filename){
		console.log('========== ' + event + ' to ' + filename + ' ===========');
		spawn(`node`, [testFilePath], { stdio: 'inherit' });
	}else{
		console.error('File name not provided!');
	}
});
