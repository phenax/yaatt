//@flow

import type { Future } from 'fluture';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';


export type QueryParams = string | Object;
export type UrlString = string;

export type RequestOptions = AxiosRequestConfig;
export type ServerResponse = AxiosResponse;

export type TestError = string | Error;

export type ResponseHelper = {
	get: (Array<string>) => any,
	matchProp: (Array<string>, value: any) => ResponseHelper,
	matchSchema: (Object) => ResponseHelper,
	assert: ((ServerResponse, Object) => any) => ResponseHelper,
};

export type onResponseCallback = (Response) => any;


export type RequestTestCase = {
	label: string,
	url: UrlString,
	method: string,
};


export type Dependency = {
	...RequestTestCase,
	onResponse: onResponseCallback,
};

export type TestSuite = {
	...RequestTestCase,
	dependencies: { [key: string]: Dependency },
	tests: { [key: string]: TestCase },
};

export type Test = {
	...RequestTestCase,
	dependencies: { [key: string]: Dependency },
	test: TestCase,
};

export type TestCase = {
	...RequestOptions,
	label: string,
	onResponse: onResponseCallback,
};

export type KeyValue = {
	key: string,
	value: any,
};

export type ResponseClass = ServerResponse => ResponseHelper;

export type MapFutureFunction =
	((any, number, any) => Future) => Array<any> => Future;
