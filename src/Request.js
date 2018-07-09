// @flow

import { pick, compose, prop, evolve, mergeDeepRight, map, chain } from 'ramda';
import Future from 'fluture';

import { toParams, mapFutureAsync, request, tryF, mapToList, listToMap, constant } from './utils';
import { createClass } from './utils/create-class';
import { validateRequest } from './utils/validation';
import Response from './Response';
import { log } from './utils/logger';

const callDependency = ({ key, value }: Object): Future =>
	Request(value)
		.execute()
		.map(dependency => ({ key, value: dependency }));


const defaultProps = {
	label: '',
	description: '',
	request: {
		method: 'get',
		params: {},
		data: {},
		_: constant({}), // Partial request
	},
	dependencies: {},
	onResponse: res => res.get([]),
};

const applyDefaults = mergeDeepRight(defaultProps);
const normalize = evolve({
	request: {
		data: toParams,
		params: toParams,
	}
});


const Request = createClass({
	constructor: compose(
		validateRequest,
		normalize,
		applyDefaults,
		pick([
			'label',
			'request',
			'dependencies',
			'onResponse',
		]),
	),

	handleResponse: ({ onResponse }) => compose(
		chain(tryF(onResponse)),
		map(Response),
	),

	executeDependencies: req => () => compose(
		mapFutureAsync(callDependency),
		mapToList,
		prop('dependencies'),
	)(req),

	execute: req => compose(
		req.handleResponse,
		chain(req.fetchRequest),
		map(mergeDeepRight(req)),
		map(req.getPartialRequest),
		map(dependencies => ({ request: req, dependencies })),
		map(listToMap),
		req.executeDependencies,
	),

	fetchRequest: () => compose(
		request,
		prop('request'),
	),

	getPartialRequest: ({ request }) => compose(
		normalize,
		applyDefaults,
		options => ({ request: request._(options) }),
	),
});

export default Request;