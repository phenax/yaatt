// export * from './docs-generator';

import { build as buildDocs } from './docs-generator';

export { buildDocs };

buildDocs({
	outputDir: '/home/akshayn/Desktop/tester/index.html',
	testSuites: [
		{
			label: 'Hello world',
			request: {
				url: '/yo'
			},
			tests: {
				'should do stuff': {},
			},
		}
	],
}).fork(
	console.log,
	console.log,
);
