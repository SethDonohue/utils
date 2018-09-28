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
				resolve(results);
				console.log('End of input.');
				//process.stdin.pause();
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
			.then(() => promptWatchers('Enter path to Watched file or "q" to start watch: '))
			.then(results => {
				pathResults.filesToWatch = results;
				resolve(pathResults);
			})
			.catch(error => console.log(error));
	});
}

//run();

module.exports = run;
