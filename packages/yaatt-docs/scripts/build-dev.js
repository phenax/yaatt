const { throwError } = require('@yaatt/utils');

// const serve = require('webpack-dev-server');
const config = require('./webpack.dev.config.js');
const { Webpack } = require('./webpack');

Webpack(config).watch()
	.fork(
		throwError,
		c => console.log('Watching your files for changes'),
	);
