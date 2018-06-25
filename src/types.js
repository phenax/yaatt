//@flow

import type { Future } from 'fluture';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';


export type QueryParams = string | Object;

export type TestError = string | Error;

export type ServerResponse = AxiosResponse;

export type ResponseHelper = {
	get: (Array<string>) => any,
	matchProp: (Array<string>, value: any) => ResponseHelper,
	matchSchema: (Object) => ResponseHelper,
	assert: ((ServerResponse, Object) => any) => ResponseHelper,
};

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

export type MapFutureFunction =
	((any, number, any) => Future) => Array<any> => Future

export type RequestOptions = AxiosRequestConfig;
