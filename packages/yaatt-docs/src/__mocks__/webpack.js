
import Future from 'fluture';

export default config => Future((rej, res) => {
	config.throwError? rej(): res(config);
	return () => null;
});