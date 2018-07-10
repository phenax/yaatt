// @flow

import React from 'react';
import { renderToStaticString } from 'react-dom/server';
import { toTestCases } from '@yaatt/utils';
import { compose } from 'ramda';

import type { ApiDocumentation, TestSuite } from '@yaatt/core/src/types';

import ApiDocsPage from './templates';

export const toDocsFormat = (testSuite: TestSuite): ApiDocumentation => {
	const { url, method, ...request } = testSuite.request;

	return {
		name: testSuite.label,
		description: testSuite.description,
		url: url,
		method: method,
		request: request,
		tests: toTestCases(testSuite.tests),
	};
};

export const renderDocs = (apiDocs: ApiDocumentation) => {
	const page = <ApiDocsPage docs={apiDocs} />;
	return renderToStaticString(page);
};

export const renderTestSuite = compose(renderDocs, toDocsFormat);
