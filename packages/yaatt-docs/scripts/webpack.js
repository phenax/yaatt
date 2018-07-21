
const webpack = require('webpack');
const Future = require('fluture');

const future = (fn) => Future((rej, res) => {
	fn(rej, res);
	return () => null;
});

const defaultWatchOptions = {
	// aggregateTimeout: 300,
	// poll: undefined
};

const wpCallback = (rej, res) => (err, stats) =>
	err || stats.hasErrors()
		? rej(err || stats.compilation.errors)
		: res(stats);

// Webpack :: WebpackConfig :: Compiler
const Webpack = config => {
	const wCompiler = webpack(config);

	return {
		run: () =>
			future((rej, res) =>
				wCompiler.run(wpCallback(rej, res))),
		watch: (watchOptions = defaultWatchOptions) =>
			future((rej, res) =>
				wCompiler.watch(watchOptions, wpCallback(rej, res))),
	};
};

module.exports = {
	run: c => c.run(),
	watch: c => c.watch(),
	Webpack,
};
