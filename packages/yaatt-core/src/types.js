//@flow

import type { Future } from 'fluture';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';


export type QueryParams = string | Object;
export type UrlString = string;

export type RequestOptions = {
	...AxiosRequestConfig,
	_: Object => AxiosRequestConfig,
};
export type ServerResponse = AxiosResponse;

export type TestError = string | Error;

export type ResponseHelper = {
	get: (Array<string>) => any,
	matchProp: (Array<string>, value: any) => ResponseHelper,
	matchSchema: (Object) => ResponseHelper,
	assert: ((ServerResponse, Object) => any) => ResponseHelper,
};

export type OnResponseFunction = (Response) => any;

export type TestCase = {
	label?: string,
	description?: string,
	request: RequestOptions,
	onResponse: OnResponseFunction,
};

export type Dependency = TestCase;

export type TestSuite = {
	label: string,
	description?: string,
	request: RequestOptions,
	dependencies?: { [key: string]: Dependency },
	tests: { [key: string]: TestCase },
};

export type Pair = {
	key: string,
	value: any,
};

export type MapFutureFunction =
	((any, number, any) => Future) => Array<any> => Future;
