// @flow

import { compose, map, slice, split, prop } from 'ramda';
import crypto from 'crypto';
import { toTestCases, log } from '@yaatt/utils';

import type { ApiDocumentation, TestSuite } from '@yaatt/core/src/types';

import getWebpackConfig from './webpackConfig';
import webpack from './webpack';

export const generateRandomHex = (size?: number = 10): string =>
	crypto.randomBytes(size / 2).toString('hex');

export const toUrlSafeString = (str: string): string =>
	(str || '')
		.replace(/^https?:\/\//gi, '')
		.replace(/[^A-Za-z0-9]+/gi, '-');

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

export const toWebpackConfig = (apiDocs: Array<ApiDocumentation>) => ({
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

