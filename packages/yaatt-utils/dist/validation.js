"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRequest = exports.validateTestSuite = exports.validateSchema = exports.TestSuite = exports.TestCase = exports.Request = void 0;

var _utils = require("@yaatt/utils");

var _helpers = require("./helpers");

var Request = _utils.Joi.object().keys({
  url: _utils.Joi.string(),
  method: _utils.Joi.string(),
  headers: _utils.Joi.object(),
  params: [_utils.Joi.object(), _utils.Joi.string()],
  data: [_utils.Joi.object(), _utils.Joi.string()],
  _: _utils.Joi.func()
});

exports.Request = Request;

var TestCase = _utils.Joi.object().keys({
  label: _utils.Joi.string().empty(''),
  description: _utils.Joi.string().empty(''),
  request: Request.empty({}),
  dependencies: _utils.Joi.object(),
  onResponse: _utils.Joi.func()
});

exports.TestCase = TestCase;

var TestSuite = _utils.Joi.object().keys({
  label: _utils.Joi.string().required(),
  description: _utils.Joi.string(),
  request: Request.append({
    url: _utils.Joi.string().required()
  }).required(),
  dependencies: _utils.Joi.object(),
  tests: _utils.Joi.object().pattern(_utils.Joi.string(), TestCase)
});

exports.TestSuite = TestSuite;

var validateSchema = function validateSchema(schema) {
  return function (obj) {
    var _Joi$validate = _utils.Joi.validate(obj, schema),
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