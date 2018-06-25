//@flow

type QueryParams = string|Object;

type ServerResponse = {
	data: any,
	headers: Object,
	status: number,
};

type Response = Object;

type UrlString = string;

type TestSuite = {
	url: UrlString,
	method: string,
	label: string,
};

type TestCase = {
	label: String,
	onResponse: (Response) => Response
};

module.exports = {
	QueryParams,
	ServerResponse,
	TestSuite,
	TestCase,
};
