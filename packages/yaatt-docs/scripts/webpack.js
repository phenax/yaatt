
const { always } = require('ramda');
const webpack = require('webpack');
const Future = require('fluture');

const watchOptions = {
	// aggregateTimeout: 300,
	// poll: undefined
};

const wCallback = (rej, res) => (err, stats) =>
	err || stats.hasErrors()
		? rej(err || stats.compilation.errors)
		: res(stats);

// Webpack :: WebpackConfig :: Compiler
const Webpack = config => {
	const wCompiler = webpack(config);

	return {
		run: () => Future((rej, res) => {
			wCompiler.run(wCallback(rej, res));
			return always(null);
		}),
		watch: (options = {}) => Future((rej, res) => {
			const wpOptns = Object.assign({}, watchOptions, options);
			const watcher = wCompiler.watch(wpOptns, wCallback(rej, res));
			return () =>  watcher.close();
		}),
	};
};

module.exports = {
	run: config => c => c.run(config),
	watch: config => c => c.watch(config),
	Webpack,
};
