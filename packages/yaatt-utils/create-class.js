// @flow

import { curry, compose, identity } from 'ramda';

type Methods = { [key: string]: any => Function };
type ClassDefinition = {
	constructor: Function,
	...Methods,
};

export const initializeClassMethods = curry((methods: Methods, obj: Object) => {
	Object.keys(methods).forEach(name => {
		obj[name] = (...args) =>  methods[name](obj)(...args);
	});
	return obj;
});

export const attachUtility = (constructor: Function, methods: Methods) => (Factory: Function) => {
	Factory.$$ = { ...methods };
	Factory.$$.constructor = constructor;
	Factory.extend =
		({ constructor: childConstructor = identity, ...childMethods }) => 
			createClass({
				constructor: compose( childConstructor, constructor ),
				...methods,
				...childMethods,
			});
	return Factory;
};

export const createClass =
	({ constructor = identity, ...methods }: ClassDefinition) =>
		attachUtility(constructor, methods)(
			compose(
				initializeClassMethods(methods),
				constructor,
			)
		);
