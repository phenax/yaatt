"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = void 0;

var _ramda = require("ramda");

var _fluture = _interopRequireDefault(require("fluture"));

var _utils = require("@yaatt/utils");

var _Response = require("./Response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callDependency = function callDependency(_ref) {
  var key = _ref.key,
      value = _ref.value;
  return Request(value).execute().map(function (dependency) {
    return {
      key: key,
      value: dependency
    };
  });
};

var defaultProps = {
  label: '',
  description: '',
  request: {
    method: 'get',
    params: {},
    data: {},
    _: (0, _ramda.always)({}) // Partial request

  },
  dependencies: {},
  onResponse: function onResponse(res) {
    return res.get([]);
  }
};
var applyDefaults = (0, _ramda.mergeDeepRight)(defaultProps);
var normalize = (0, _ramda.evolve)({
  request: {
    data: _utils.toParams,
    params: _utils.toParams
  }
});
var Request = (0, _utils.createClass)({
  constructor: (0, _ramda.compose)(_utils.validateRequest, normalize, applyDefaults, (0, _ramda.pick)(['label', 'request', 'dependencies', 'onResponse'])),
  handleResponse: function handleResponse(_ref2) {
    var onResponse = _ref2.onResponse;
    return (0, _ramda.compose)((0, _ramda.chain)((0, _utils.tryF)(onResponse)), (0, _ramda.map)(_Response.Response));
  },
  executeDependencies: function executeDependencies(req) {
    return function () {
      return (0, _ramda.compose)((0, _utils.mapFutureAsync)(callDependency), _utils.mapToList, (0, _ramda.prop)('dependencies'))(req);
    };
  },
  execute: function execute(req) {
    return (0, _ramda.compose)(req.handleResponse, (0, _ramda.chain)(req.fetchRequest), (0, _ramda.map)((0, _ramda.mergeDeepRight)(req)), (0, _ramda.map)(req.getPartialRequest), (0, _ramda.map)(function (dependencies) {
      return {
        request: req,
        dependencies: dependencies
      };
    }), (0, _ramda.map)(_utils.listToMap), req.executeDependencies);
  },
  fetchRequest: function fetchRequest() {
    return (0, _ramda.compose)(_utils.request, (0, _ramda.prop)('request'));
  },
  getPartialRequest: function getPartialRequest(_ref3) {
    var request = _ref3.request;
    return (0, _ramda.compose)(normalize, applyDefaults, function (options) {
      return {
        request: request._(options)
      };
    });
  }
});
exports.Request = Request;