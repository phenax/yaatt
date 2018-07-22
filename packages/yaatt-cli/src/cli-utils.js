
const path = require('path');
const { compose, cond, prop, propSatisfies, T } = require('ramda');
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

const getArguments = () => 
	yargs
		.option('config', {
			describe: 'Specify path to config file',
			alias: 'c',
			type: 'string',
		})
		.option('docs', {
			describe: 'Path to dump html api documentation generated from the test suites',
			alias: 'd',
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

const loadConfig = compose(
	require,
	path.resolve,
);

const toCliConfig = ({ _: testSuites, docs }) => ({
	testSuites,
	documentation: {
		outputDir: docs,
	},
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
	validateArgs,
	getArguments,
	getConfig,
};

