
import webpack from 'webpack';
import Future from 'fluture';

export default config => Future((rej, res) => {

	webpack(config, (err, stats) =>
		err || stats.hasErrors()
			? rej(err || stats.compilation.errors)
			: res(stats));

	return () => null;
});
