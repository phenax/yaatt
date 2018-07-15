"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listToMap = exports.mapToList = exports.tryF = exports.request = exports.mapFutureAsync = exports.mapFutureSync = exports.toTestCases = exports.toParams = exports.throwError = void 0;

var _querystring = require("querystring");

var _ramda = require("ramda");

var _axios = _interopRequireDefault(require("axios"));

var _fluture = _interopRequireDefault(require("fluture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var throwError = function throwError() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unknown Error';
  var options = arguments.length > 1 ? arguments[1] : undefined;
  var error = e instanceof Error ? e : new Error(e);

  var _ref = options || {},
      future = _ref.future,
      promise = _ref.promise;

  if (promise) {
    return Promise.reject(error);
  } else if (future) {
    return _fluture.default.reject(error);
  }

  throw error;
};

exports.throwError = throwError;

var toParams = function toParams(query) {
  if (!query) return {};

  if (typeof query === 'string') {
    return (0, _querystring.parse)(query);
  }

  return query;
};

exports.toParams = toParams;

var toTestCases = function toTestCases(_ref2) {
  var request = _ref2.request,
      dependencies = _ref2.dependencies,
      tests = _ref2.tests;
  return Object.keys(tests).map(function (label) {
    var test = tests[label];
    return _objectSpread({}, test, {
      label: label,
      request: _objectSpread({}, request, test.request),
      dependencies: dependencies
    });
  });
};

exports.toTestCases = toTestCases;
var mapFutureSync = (0, _ramda.curry)(function (fn, list) {
  return list.reduce(function (fChain, item, index) {
    return fChain.chain(function (data) {
      return fn(item, index, data);
    });
  }, _fluture.default.of(null));
});
exports.mapFutureSync = mapFutureSync;
var mapFutureAsync = (0, _ramda.curry)(function (fn, list) {
  return _fluture.default.parallel(10, list.map(fn));
});
exports.mapFutureAsync = mapFutureAsync;

var request = _fluture.default.encaseP(function (options) {
  return request.mock ? request.mock(options) : (0, _axios.default)(options);
});

exports.request = request;

var tryF = function tryF(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _fluture.default.try(function () {
      return fn.apply(void 0, args);
    });
  };
};

exports.tryF = tryF;

var mapToList = function mapToList(objectMap) {
  return Object.keys(objectMap || {}).map(function (key) {
    return {
      key: key,
      value: objectMap[key]
    };
  });
};

exports.mapToList = mapToList;

var listToMap = function listToMap(list) {
  return (list || []).reduce(function (acc, _ref3) {
    var key = _ref3.key,
        value = _ref3.value;
    return _objectSpread({}, acc, _defineProperty({}, key, value));
  }, {});
};

exports.listToMap = listToMap;