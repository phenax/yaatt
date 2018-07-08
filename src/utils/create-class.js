// @flow

import { curry, compose, identity } from 'ramda';

export const initializeClassMethods = curry((methods: Object, obj: Object) => {
	obj.__methods = methods;
	Object.keys(methods).forEach(name =>
		obj[name] = methods[name](obj));
	return obj;
});

export const attachUtility = (constructor: Function, methods: Object) => (Factory: Function) => {
	Factory.constructor = constructor;
	Factory.methods = methods;
	Factory.extend = ({ constructor: childConstructor, ...childMethods }) => 
		createClass({
			constructor: compose(
				childConstructor,
				Factory.constructor,
			),
			...Factory.methods,
			...childMethods,
		});
	return Factory;
};

export const createClass =
	({ constructor = identity, ...methods }: Object) =>
		attachUtility(constructor, methods)(
			compose(
				initializeClassMethods(methods),
				constructor,
			)
		);
