const { throwError, logInfo } = require('@yaatt/utils');

// const serve = require('webpack-dev-server');
const config = require('./webpack.dev.config.js');
const { Webpack } = require('./webpack');

Webpack(config).watch()
	.fork(
		throwError,
		logInfo('Watching your files for changes'),
	);
