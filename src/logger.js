
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

const logTestCase = (testCase) => {
    const { label } = testCase;

    console.log(chalk.green('   -', label));

    return testCase;
};

module.exports = {
    logTestCase,
    logTestSuite,
};
