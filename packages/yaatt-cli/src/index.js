
const path = require('path');
const glob = require('glob');
const { flatten, map, compose } = require('ramda');
const yargs = require('yargs');
const { throwError, log } = require('@yaatt/utils');

// TODO: Use Joi to validate arguments
// TODO: Have more config passed via arguments
const validateArgs = (args) => {
	if(!args.testSuites.length) {
		return throwError('No test suites specified');
	}

	return args;
};

const importTestCase = require;

const resolvePaths = compose(
	map(path.resolve),
	flatten,
	map(glob.sync),
);

const getArguments = () => {
	return yargs
		.option('config', {
			describe: 'Specify path to config file',
			alias: 'c',
			default: '',
		})
		.option('help', {
			describe: 'Get information about yaatt cli options',
			alias: 'h',
			default: false,
		})
		.option('version', {
			describe: 'Show current @yaatt/cli version number',
			alias: 'v',
			default: false,
		})
		.argv;
};

module.exports = {
	resolvePaths,
	validateArgs,
	importTestCase,
	getArguments,
};
