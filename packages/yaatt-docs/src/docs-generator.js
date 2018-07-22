// @flow

import fs from 'fs';
import Future from 'fluture';
import { renderToStaticMarkup } from 'react-dom/server';
import { compose, map, evolve } from 'ramda';
import { toTestCases, toUrlSafeString, generateRandomHex } from '@yaatt/utils';

import type { ApiDocumentation, TestSuite } from '@yaatt/core/src/types';

import renderDocumentation from './templates';
import injectIntoHtml from './templates/html';

type FilePath = string;
type DocsComponentProps = {
	docs: ApiDocumentation,
};
type BuildOptions = {
	testSuites: Array<ApiDocumentation>|Array<TestSuite>,
	outputDir: string,
};

export const toDocsFormat = (testSuite: TestSuite): ApiDocumentation => {
	const { url, method, ...request } = testSuite.request;
	const id = generateRandomHex();

	return {
		id,
		name: testSuite.label,
		description: testSuite.description || '',
		url,
		method,
		request,
		docLink: `/suite/${method}--${toUrlSafeString(url)}--${id}`,
		tests: toTestCases(testSuite),
	};
};

export const saveToFile = (filename: FilePath) => (contents: string): Future =>
	Future.node(done => fs.writeFile(filename, contents, done));

export const renderPage: (FilePath => DocsComponentProps => Future) = outputDir => compose(
	saveToFile(outputDir),
	injectIntoHtml,
	children => ({ children }),
	renderToStaticMarkup,
	renderDocumentation,
);

export const build: (BuildOptions => Future) = compose(
	({ outputDir, testSuites }) => renderPage(outputDir)(testSuites),
	evolve({
		testSuites: map(toDocsFormat)
	}),
);
