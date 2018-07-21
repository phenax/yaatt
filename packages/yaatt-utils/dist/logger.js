"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logNewLine = exports.log = exports.logInfo = exports.logError = exports.logTestCase = exports.logTestSuite = exports.konsole = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
var konsole = {
  isEnabled: true,
  log: function log() {
    if (konsole.isEnabled) {
      var _console;

      (_console = console).log.apply(_console, arguments);
    }
  },
  error: function error() {},
  mock: function mock(_ref) {
    var log = _ref.log;
    var oldLog = konsole.log;
    konsole.log = log;
    return function () {
      konsole.log = oldLog;
    };
  }
};
exports.konsole = konsole;

var logTestSuite = function logTestSuite(testSuite) {
  var _testSuite$request = testSuite.request,
      url = _testSuite$request.url,
      method = _testSuite$request.method,
      label = testSuite.label;
  logNewLine();
  konsole.log(_chalk.default.bold(label));
  konsole.log(_chalk.default.blue.bold((0, _ramda.toUpper)(method)), _chalk.default.blue(url));
  return testSuite;
};

exports.logTestSuite = logTestSuite;

var logTestCase = function logTestCase(testCase) {
  var passed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _testCase$label = testCase.label,
      label = _testCase$label === void 0 ? '' : _testCase$label;

  if (passed) {
    konsole.log(_chalk.default.green('   -', label));
  } else {
    konsole.log(_chalk.default.red('   x', label));
  }

  return testCase;
};

exports.logTestCase = logTestCase;

var logError = function logError(e) {
  var message = e.message,
      stack = e.stack;
  logNewLine();
  konsole.log(_chalk.default.bgRed.bold('== Test failed with the following error(s) =='));
  logNewLine();
  konsole.log(_chalk.default.red.bold(message));
  konsole.log(_chalk.default.red(stack));
  return e;
};

exports.logError = logError;

var getColoredChalk = function getColoredChalk(color) {
  return {
    red: _chalk.default.red,
    blue: _chalk.default.blue,
    green: _chalk.default.green
  }[color] || _chalk.default.blue;
};

var logInfo = function logInfo(msg, color) {
  return function (data) {
    var colored = getColoredChalk(color);
    konsole.log(colored.bold(msg));
    return data;
  };
};

exports.logInfo = logInfo;

var log = function log(label) {
  return function (data) {
    console.log(_chalk.default.blue.bold('>> ', // (new Date()).toString(),
    label, ':'), data);
    return data;
  };
};

exports.log = log;

var logNewLine = function logNewLine() {
  return konsole.log('');
};

exports.logNewLine = logNewLine;