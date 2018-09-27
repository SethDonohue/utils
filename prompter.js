const promptRunner = (question) => {
	return new Promise((resolve, reject) => {
		const {stdin, stdout} = process;
		
		stdin.resume();
		stdout.write(question);
		stdin.on('data', data => resolve(data.toString().trim()));
		stdin.on('error', err => reject(err));
	});
}

const promptWatchers = (question) => {
	return new Promise((resolve, reject) => {
		const {stdin, stdout} = process;
		const results = [];

		stdin.resume();
		stdout.write(question);

		stdin.on('data', data => {
			data = data.toString().trim();
			if(data == 'q') {
				console.log('Beginning watch process...');
				resolve(results);
			} else {
				results.push(data);
				console.log('File to WATCH: ', data);
				stdout.write(question);
			}
		});
		stdin.on('error', err => reject(err));
	});
}

const pathResults = {};

const run = () => {
	return new Promise((resolve, reject) => {
		promptRunner('Enter the path for the file to RUN on watched file(s) changes: ')
			.then( runner => {
				console.log('File to RUN: ', runner);
				pathResults.fileToRun = runner;
			})
			.then(() => promptWatchers('Enter path to Watched file: '))
			.then(results => {
				pathResults.filesToWatch = results;
				process.stdin.destroy();
				//console.log('Resolved');
				resolve(pathResults);
			})
			.catch(error => console.log(error));
	});
}

//run();

module.exports = run;
