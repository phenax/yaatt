// @flow

// import React from 'react';
// import { renderToStaticString } from 'react-dom/server';
import { toTestCases } from '@yaatt/utils';
import { compose } from 'ramda';

import type { ApiDocumentation, TestSuite } from '@yaatt/core/src/types';

// import ApiDocsPage from './templates';

const getRandomId = () => Math.random().toString(16).split('.')[1].slice(0, 8);

const toSlug = url => url.replace(/^https?:\/\//gi, '').replace(/[^A-Za-z0-9]+/gi, '-');

export const toDocsFormat = (testSuite: TestSuite): ApiDocumentation => {
	const { url, method, ...request } = testSuite.request;
	const id = getRandomId();

	return {
		id,
		name: testSuite.label,
		description: testSuite.description || '',
		url,
		method,
		request,
		docLink: `/suite/${method}--${toSlug(url)}--${id}`,
		tests: toTestCases(testSuite),
	};
};

// export const renderDocs = (apiDocs: ApiDocumentation) => {
// 	const page = <ApiDocsPage docs={apiDocs} />;
// 	return renderToStaticString(page);
// };

// export const renderTestSuite = compose(renderDocs, toDocsFormat);
