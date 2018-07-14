// @flow

import { compose, map, evolve } from 'ramda';
import path from 'path';
import { toTestCases, toUrlSafeString, generateRandomHex } from '@yaatt/utils';

import type Future from 'fluture';
import type { ApiDocumentation, TestSuite } from '@yaatt/core/src/types';

import getWebpackConfig from './webpack-config';
import webpack from './webpack';

type ConfigModifiers = Object;
type BuildOptions = {
	suites: Array<ApiDocumentation>|Array<TestSuite>,
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

export const getConfigModifiers = ({ suites, outputDir }: BuildOptions): ConfigModifiers => ({
	outputPath: path.resolve(outputDir),
	templateParameters: {
		globalData: `
			window.__DATA = {};
			window.__DATA.apiDocs = ${JSON.stringify(suites)};
		`,
	},
});

export const buildApiDocs: (BuildOptions => Future) = compose(
	webpack,
	getWebpackConfig,
	getConfigModifiers,
);

export const build: (BuildOptions => Future) = compose(
	buildApiDocs,
	evolve({
		suites: map(toDocsFormat)
	}),
);

