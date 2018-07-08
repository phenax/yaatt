// @flow

import { pick, compose, prop, evolve, mergeDeepRight} from 'ramda';
import Future from 'fluture';

import { toParams, mapFutureAsync, request, tryF, mapToList, createClass, listToMap, constant } from './utils';
import Response from './Response';
import { log } from './logger';

const callDependency = ({ key, value }: Object): Future =>
	Request(value)
		.execute()
		.map(dependency => ({ key, value: dependency }));

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
		_: constant({}),
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
		req.executeDependencies()
			.map(listToMap)
			.map(dependencies => ({ request: req, dependencies }))
			.map(compose(
				normalize,
				applyDefaults,
				req.getDynamicOptions,
			))
			.chain(compose(
				request,
				prop('request'),
				mergeDeepRight(req),
			))
			.map(Response)
			.chain(tryF(req.handleResponse)),

	getDynamicOptions: req => (...args) => ({
		request: req.request._(...args),
	}),

	executeDependencies: req => (): Future => compose(
		mapFutureAsync(callDependency),
		mapToList,
		prop('dependencies'),
	)(req),
});

export default Request;
