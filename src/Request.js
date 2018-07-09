// @flow

import { pick, compose, prop, evolve, mergeDeepRight} from 'ramda';
import Future from 'fluture';

import { toParams, mapFutureAsync, request, tryF, mapToList, listToMap, constant } from './utils';
import { createClass } from './utils/create-class';
import Response from './Response';
import { log } from './utils/logger';

const callDependency = ({ key, value }: Object): Future =>
	Request(value)
		.execute()
		.map(dependency => ({ key, value: dependency }));

const executeDependencies = compose(
	mapFutureAsync(callDependency),
	mapToList,
	prop('dependencies'),
);

const normalize = evolve({
	request: {
		data: toParams,
		params: toParams,
	}
});

const defaultProps = {
	request: {
		params: {},
		data: {},
		label: '',
		_: constant({}), // Partial request
	},
	dependencies: {},
	onResponse: res => res.get([]),
};

const applyDefaults = mergeDeepRight(defaultProps);

const Request = createClass({
	constructor: compose(
		normalize,
		applyDefaults,
		pick([
			'request',
			'dependencies',
			'onResponse',
		]),
	),

	handleResponse: req => (...args) => req.onResponse(...args),

	execute: req => (): Future =>
		executeDependencies(req)
			.map(listToMap)
			.map(dependencies => ({ request: req, dependencies }))
			.map(compose(
				normalize,
				applyDefaults,
				req.getPartialRequest,
			))
			.chain(req.fetchRequest)
			.map(Response)
			.chain(tryF(req.handleResponse)),

	fetchRequest: req => compose(
		request,
		prop('request'),
		mergeDeepRight(req),
	),

	getPartialRequest: req => (...args) => ({
		request: req.request._(...args),
	}),
});

export default Request;
