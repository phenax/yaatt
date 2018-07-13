// @flow

import webpack from 'webpack';
import webpackConfig from '../config/webpack.config';
import { toTestCases } from '@yaatt/utils';
import { compose, merge } from 'ramda';
import Future from 'fluture';

import type { ApiDocumentation, TestSuite } from '@yaatt/core/src/types';

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

export const buildPage = (apiDocs: Array<ApiDocumentation>) => {
	const config = webpackConfig({
		templateParameters: {

		},
	});

	return Future.of((rej, res) => webpack(config, (err, stats) =>
		err || stats.hasErrors()
			? rej(err || stats.compilation.errors)
			: res(stats)	
	));
};
