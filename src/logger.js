// @flow
/* eslint-disable no-console */

import chalk from 'chalk';
import { toUpper } from 'ramda';

import type { TestSuite, TestCase } from './types';

export const konsole = {
	isEnabled: true,
	log(...args: Array<any>) {
		if(konsole.isEnabled) {
			console.log(...args);
		}
	},
	error() {},
	mock({ log }: Object): Function {
		const oldLog = konsole.log;
		konsole.log = log;
		return () => {
			konsole.log = oldLog;
		};
	},
};

export const logTestSuite = (testSuite: TestSuite) => {
	const { request: { url, method }, label } = testSuite;

	konsole.log();
	konsole.log(chalk.bold(label));
	konsole.log(
		chalk.blue.bold(toUpper(method)),
		chalk.blue(url),
	);

	return testSuite;
};

export const logTestCase = (testCase: TestCase, passed: bool = false) => {
	const { label = '' } = testCase;

	if(passed) {
		konsole.log(chalk.green('   -', label));
	} else {
		konsole.log(chalk.red('   x', label));
	}

	return testCase;
};

export const logError = (e: Error) => {
	const { message, stack } = e;

	konsole.log();
	konsole.log(chalk.bgRed.bold('== Test failed with the following error(s) =='));
	konsole.log();
	konsole.log(chalk.red.bold(message));
	konsole.log(chalk.red(stack));

	return e;
};

export const log = (label: string) => (data: any): any => {
	console.log(
		chalk.blue.bold(
			'>> ',
			// (new Date()).toString(),
			label,
			':',
		),
		data
	);
	return data;
};

export const logNewLine = () => konsole.log('');
