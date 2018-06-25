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
	label: string,
	url: UrlString,
	method: string,
	tests: { [key: string]: TestCase },
};

export type Test = {
	label: string,
	url: UrlString,
	method: string,
	test: TestCase,
};

export type TestCase = {
	label: string,
	onResponse: (Response) => any,
};

export type RequestOptions = AxiosRequestConfig;
