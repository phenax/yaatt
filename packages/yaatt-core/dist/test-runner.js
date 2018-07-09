"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runTestSuite = exports.runTestCase = void 0;

var _ramda = require("ramda");

var _fluture = _interopRequireDefault(require("fluture"));

var _utils = require("@yaatt/utils");

var _Request = require("./Request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runTestCase = function runTestCase(testCase) {
  return (0, _Request.Request)(testCase).execute().map(function (resp) {
    (0, _utils.logTestCase)(testCase, true);
    return resp;
  }).mapRej(function (e) {
    (0, _utils.logTestCase)(testCase, false);
    return e;
  });
};

exports.runTestCase = runTestCase;
var runTestSuite = (0, _ramda.compose)((0, _utils.mapFutureSync)(runTestCase), _utils.toTestCases, _utils.logTestSuite, _utils.validateTestSuite);
exports.runTestSuite = runTestSuite;