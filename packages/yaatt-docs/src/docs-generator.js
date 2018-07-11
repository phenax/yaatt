// @flow

import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { toTestCases } from '@yaatt/utils';
import { compose, map } from 'ramda';

import type { ApiDocumentation, TestSuite } from '@yaatt/core/src/types';

import ApiDocsPage from './templates';
import HtmlWrapper from './templates/HtmlWrapper';

const getRandomId = () => Math.random().toString(16).split('.')[1].slice(0, 8);

const toSlug = (url: string): string =>
	(url || '')
		.replace(/^https?:\/\//gi, '')
		.replace(/[^A-Za-z0-9]+/gi, '-');

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

export const renderApiDocs = (apiDocs: Array<ApiDocumentation>) =>
	renderToString(
		<HtmlWrapper>
			<ApiDocsPage docs={apiDocs} />
		</HtmlWrapper>
	);

export const renderTestSuites: (Array<TestSuite> => string) =
	compose(renderApiDocs, map(toDocsFormat));

export const saveHtmlDocument = (fileName: string, testSuites: Array<TestSuite>) => {
	const htmlStr = renderTestSuites(testSuites);
	fs.writeFileSync(fileName, htmlStr);
};
