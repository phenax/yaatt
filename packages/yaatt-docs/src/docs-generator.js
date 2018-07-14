// @flow

import { compose, map } from 'ramda';
import { toTestCases, log } from '@yaatt/utils';

import type { ApiDocumentation, TestSuite } from '@yaatt/core/src/types';

import getWebpackConfig from './webpackConfig';
import webpack from './webpack';


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

const toWebpackConfig = (apiDocs) => ({
	templateParameters: {
		globalData: `
			window.__DATA = {};
			window.__DATA.apiDocs = ${JSON.stringify(apiDocs)};
		`,
	},
});

export const buildApiDocs = compose(
	webpack,
	getWebpackConfig,
	toWebpackConfig,
);

export const build = compose(
	buildApiDocs,
	map(toDocsFormat),
);

