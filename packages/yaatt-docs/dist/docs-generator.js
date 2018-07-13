"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPage = exports.toDocsFormat = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _webpack2 = _interopRequireDefault(require("../config/webpack.config"));

var _utils = require("@yaatt/utils");

var _ramda = require("ramda");

var _fluture = _interopRequireDefault(require("fluture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var getRandomId = function getRandomId() {
  return Math.random().toString(16).split('.')[1].slice(0, 8);
};

var toSlug = function toSlug(url) {
  return (url || '').replace(/^https?:\/\//gi, '').replace(/[^A-Za-z0-9]+/gi, '-');
};

var toDocsFormat = function toDocsFormat(testSuite) {
  var _testSuite$request = testSuite.request,
      url = _testSuite$request.url,
      method = _testSuite$request.method,
      request = _objectWithoutProperties(_testSuite$request, ["url", "method"]);

  var id = getRandomId();
  return {
    id: id,
    name: testSuite.label,
    description: testSuite.description || '',
    url: url,
    method: method,
    request: request,
    docLink: "/suite/".concat(method, "--").concat(toSlug(url), "--").concat(id),
    tests: (0, _utils.toTestCases)(testSuite)
  };
};

exports.toDocsFormat = toDocsFormat;

var buildPage = function buildPage(apiDocs) {
  var config = (0, _webpack2.default)({
    templateParameters: {}
  });
  return _fluture.default.of(function (rej, res) {
    return (0, _webpack.default)(config, function (err, stats) {
      if (err || stats.hasErrors()) {
        return rej(err || stats.compilation.errors);
      }

      return res(stats);
    });
  });
};

exports.buildPage = buildPage;