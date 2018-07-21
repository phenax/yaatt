
const Future = require('fluture');

const dummyProxy = config => () => Future((rej, res) => {
	config.throwError? rej(): res(config);
	return () => null;
});

module.exports = {
	run: config => c => c.run(config),
	watch: config => c => c.watch(config),
	Webpack:  config => ({
		run: dummyProxy(config),
		watch: dummyProxy(config),
	}),
};