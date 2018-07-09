"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRequest = exports.validateTestSuite = exports.validateSchema = exports.TestSuite = exports.TestCase = exports.Request = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Request = _joi.default.object().keys({
  url: _joi.default.string(),
  method: _joi.default.string(),
  headers: _joi.default.object(),
  params: [_joi.default.object(), _joi.default.string()],
  data: [_joi.default.object(), _joi.default.string()],
  _: _joi.default.func()
});

exports.Request = Request;

var TestCase = _joi.default.object().keys({
  label: _joi.default.string().empty(''),
  description: _joi.default.string().empty(''),
  request: Request.empty({}),
  dependencies: _joi.default.object(),
  onResponse: _joi.default.func()
});

exports.TestCase = TestCase;

var TestSuite = _joi.default.object().keys({
  label: _joi.default.string().required(),
  description: _joi.default.string(),
  request: Request.append({
    url: _joi.default.string().required()
  }).required(),
  dependencies: _joi.default.object(),
  tests: _joi.default.object().pattern(_joi.default.string(), TestCase)
});

exports.TestSuite = TestSuite;

var validateSchema = function validateSchema(schema) {
  return function (obj) {
    var _Joi$validate = _joi.default.validate(obj, schema),
        error = _Joi$validate.error;

    error && (0, _helpers.throwError)(error);
    return obj;
  };
};

exports.validateSchema = validateSchema;
var validateTestSuite = validateSchema(TestSuite);
exports.validateTestSuite = validateTestSuite;
var validateRequest = validateSchema(TestCase);
exports.validateRequest = validateRequest;