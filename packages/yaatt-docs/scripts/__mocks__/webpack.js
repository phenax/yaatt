
const Future = require('fluture');

const dummyProxy = config => () => Future((rej, res) => {
	config.throwError? rej(): res(config);
	return () => null;
});

module.exports = {
	run: c => c.run(),
	watch: c => c.watch(),
	Webpack:  config => ({
		run: dummyProxy(config),
		watch: dummyProxy(config),
	}),
};