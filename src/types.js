//@flow

import type { AxiosRequestConfig } from 'axios';

export type QueryParams = string | Object;

export type TestError = string | Error;

export type ServerResponse = {
	data: any,
	headers: Object,
	status: number,
};

export type Response = Object;

export type UrlString = string;

export type TestSuite = {
	url: UrlString,
	method: string,
	label: string,
	tests: { [key: string]: TestCase },
};

export type TestCase = {
	label: string,
	onResponse: (Response) => Response
};

export type Test = {
	url: UrlString,
	method: string,
	label: string,
	test: TestCase,
};

export type RequestOptions = AxiosRequestConfig;
