"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = exports.buildApiDocs = exports.toWebpackConfig = exports.toDocsFormat = exports.toUrlSafeString = exports.generateRandomHex = void 0;

var _ramda = require("ramda");

var _crypto = _interopRequireDefault(require("crypto"));

var _utils = require("@yaatt/utils");

var _webpackConfig = _interopRequireDefault(require("./webpackConfig"));

var _webpack = _interopRequireDefault(require("./webpack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var generateRandomHex = function generateRandomHex() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  return _crypto.default.randomBytes(size / 2).toString('hex');
};

exports.generateRandomHex = generateRandomHex;

var toUrlSafeString = function toUrlSafeString(str) {
  return (str || '').replace(/^https?:\/\//gi, '').replace(/[^A-Za-z0-9]+/gi, '-');
};

exports.toUrlSafeString = toUrlSafeString;

var toDocsFormat = function toDocsFormat(testSuite) {
  var _testSuite$request = testSuite.request,
      url = _testSuite$request.url,
      method = _testSuite$request.method,
      request = _objectWithoutProperties(_testSuite$request, ["url", "method"]);

  var id = generateRandomHex();
  return {
    id: id,
    name: testSuite.label,
    description: testSuite.description || '',
    url: url,
    method: method,
    request: request,
    docLink: "/suite/".concat(method, "--").concat(toUrlSafeString(url), "--").concat(id),
    tests: (0, _utils.toTestCases)(testSuite)
  };
};

exports.toDocsFormat = toDocsFormat;

var toWebpackConfig = function toWebpackConfig(apiDocs) {
  return {
    templateParameters: {
      globalData: "\n\t\t\twindow.__DATA = {};\n\t\t\twindow.__DATA.apiDocs = ".concat(JSON.stringify(apiDocs), ";\n\t\t")
    }
  };
};

exports.toWebpackConfig = toWebpackConfig;
var buildApiDocs = (0, _ramda.compose)(_webpack.default, _webpackConfig.default, toWebpackConfig);
exports.buildApiDocs = buildApiDocs;
var build = (0, _ramda.compose)(buildApiDocs, (0, _ramda.map)(toDocsFormat));
exports.build = build;