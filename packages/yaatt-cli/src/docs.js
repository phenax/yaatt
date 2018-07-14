
const { compose, map } = require('ramda');
const { logInfo } = require('@yaatt/utils');
const { buildDocs } = require('@yaatt/docs');

const { loadTestSuites } = require('./tester');

const toDocumentationOptions = ({ testSuites, documentation, ...props }) => ({
	testSuites: loadTestSuites(testSuites),
	...props,
	...documentation
});

const generateDocumentation = compose(
	map(logInfo('Build successful', 'green')),
	buildDocs,
	logInfo('Generating documentation...'),
	toDocumentationOptions,
);

module.exports = {
	generateDocumentation,
};
