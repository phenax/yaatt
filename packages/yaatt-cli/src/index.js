
const path = require('path');
const glob = require('glob');
const { flatten, map, compose, cond, prop, propSatisfies, T } = require('ramda');
const yargs = require('yargs');
const { throwError } = require('@yaatt/utils');

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
			type: 'string',
		})
		.option('help', {
			describe: 'Get information about yaatt cli options',
			alias: 'h',
			type: 'boolean',
		})
		.option('version', {
			describe: 'Show current @yaatt/cli version number',
			alias: 'v',
			type: 'boolean',
		})
		.argv;
};

const loadConfig = compose(
	require,
	path.resolve,
);

const toCliConfig = ({ _: testSuites }) => ({
	testSuites,
});

const argumentsToConfig = cond([
	[ propSatisfies(x => !!x, 'config'), compose(loadConfig, prop('config')) ],
	[ T, toCliConfig ],
]);

const getConfig = compose(
	argumentsToConfig,
	getArguments,
);

module.exports = {
	resolvePaths,
	validateArgs,
	importTestCase,
	getArguments,
	getConfig,
};
