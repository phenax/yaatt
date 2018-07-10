"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = void 0;

var _ramda = require("ramda");

var _utils = require("@yaatt/utils");

var Response = (0, _utils.createClass)({
  constructor: (0, _ramda.compose)((0, _ramda.pick)(['data', 'status', 'headers'])),
  matchProp: function matchProp(response) {
    return function (keys, value) {
      var fieldValue = response.get(keys);
      return fieldValue === value ? response : (0, _utils.throwError)("Property \"".concat(keys.join('.'), "\" of the response was \"").concat(fieldValue, "\", expected \"").concat(value, "\""));
    };
  },
  matchHeader: function matchHeader(response) {
    return function (key, value) {
      var headerValue = response.headers[key];
      return headerValue === value ? response : (0, _utils.throwError)("Header \"".concat(key, "\" of the response was \"").concat(headerValue, "\", expected \"").concat(value, "\""));
    };
  },
  get: function get(response) {
    return function (keys) {
      return (0, _ramda.path)(keys, response.data);
    };
  },
  matchSchema: function matchSchema(response) {
    return function (schema) {
      var _Joi$validate = _utils.Joi.validate(response.data, schema),
          error = _Joi$validate.error;

      error && (0, _utils.throwError)(error);
      return response;
    };
  },
  assert: function assert(response) {
    return function (fn) {
      fn(response, {
        throwError: _utils.throwError
      });
      return response;
    };
  }
});
exports.Response = Response;