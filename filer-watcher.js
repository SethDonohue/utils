const fs = require('fs');

const filePath = 'C://Users/sdonohue/PhpstormProjects/leetcode/multiply-strings.js';
const file = fs.readFileSync(filePath);

console.log('File: ', file);

fs.watch(filePath, (event, filename) => {
	if(filename){
		console.log(event, ' ', filename, ':');
		
	}else{
		console.error('File name not provided!');
	}
});
