/* eslint-disable no-console */
// @flow

const chalk = require('chalk');
const { toUpper } = require('ramda');

const { TestSuite, TestCase } = require('./types');

const logTestSuite = (testSuite: TestSuite) => {
	const { url, method, label } = testSuite;

	console.log();
	console.log(chalk.bold(label));
	console.log(
		chalk.blue.bold(toUpper(method)),
		chalk.blue(url),
	);

	return testSuite;
};

const logTestCase = (testCase: TestCase, passed: bool = false) => {
	const { label } = testCase;

	if(passed) {
		console.log(chalk.green('   -', label));
	} else {
		console.log(chalk.red('   x', label));
	}

	return testCase;
};

const logError = (e: Error) => {
	const { message, stack } = e;

	console.log();
	console.log(chalk.bgRed.bold('== Test failed with the following error(s) =='));
	console.log();
	console.log(chalk.red.bold(message));
	console.log(chalk.red(stack));

	return e;
};

const log = (label: string) => (data: any): any => {
	console.log(
		chalk.blue.bold(
			'>> ',
			(new Date()).toString(),
			label,
			':',
		),
		data
	);
	return data;
};

const logNewLine = () => console.log('');

module.exports = {
	logTestCase,
	logTestSuite,
	logError,
	logNewLine,
	log,
};
