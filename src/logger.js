
const chalk = require('chalk');
const { toUpper, compose } = require('ramda');

const logTestSuite = (testSuite) => {
    const { url, method, label } = testSuite;

    console.log();
    console.log(chalk.bold(label));
    console.log(
        chalk.blue(
            chalk.bold(toUpper(method)),
            url,
        )
    );

    return testSuite;
}

const logTestCase = (testCase, passed = false) => {
    const { label } = testCase;

    if(passed) {
        console.log(chalk.green('   -', label));
    } else {
        console.log(chalk.red('   x', label));
    }

    return testCase;
};

const logError = e => {
    const { message, stacktrace } = e;

    console.log();
    console.log(chalk.red.bold('Test failed with the following error(s)'));
    console.log();
    console.log(chalk.bgRed.bold(message));
    console.log(chalk.red(stacktrace));

    return e;
};

module.exports = {
    logTestCase,
    logTestSuite,
    logError,
};
