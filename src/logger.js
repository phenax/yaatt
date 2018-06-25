/* eslint-disable no-console */

const chalk = require('chalk');
const { toUpper } = require('ramda');

const logTestSuite = (testSuite) => {
	const { url, method, label } = testSuite;

	console.log();
	console.log(chalk.bold(label));
	console.log(
		chalk.blue.bold(toUpper(method)),
		chalk.blue(url),
	);

	return testSuite;
};

const logTestCase = (testCase, passed = false) => {
	const { label } = testCase;

	if(passed) {
		console.log(chalk.green('   -', label));
	} else {
		console.log(chalk.red('   x', label));
	}

	return testCase;
};

const logError = e => {
	const { message, stacktrace } = e;

	console.log();
	console.log(chalk.bgRed.bold('== Test failed with the following error(s) =='));
	console.log();
	console.log(chalk.red.bold(message));
	console.log(chalk.red(stacktrace));

	return e;
};

const log = label => data => {
	console.log(
		chalk.blue.bold(
			'>> ',
			new Date(),
			label,
			':',
		),
		data
	);
	return data;
};

module.exports = {
	logTestCase,
	logTestSuite,
	logError,
	log,
};
