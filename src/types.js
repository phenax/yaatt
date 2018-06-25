//@flow

export type QueryParams = string|Object;

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
};

export type TestCase = {
	label: String,
	onResponse: (Response) => Response
};
