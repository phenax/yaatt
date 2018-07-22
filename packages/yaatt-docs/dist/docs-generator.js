"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = exports.renderPage = exports.saveToFile = exports.toDocsFormat = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _fluture = _interopRequireDefault(require("fluture"));

var _server = require("react-dom/server");

var _ramda = require("ramda");

var _utils = require("@yaatt/utils");

var _templates = _interopRequireDefault(require("./templates"));

var _html = _interopRequireDefault(require("./templates/html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var toDocsFormat = function toDocsFormat(testSuite) {
  var _testSuite$request = testSuite.request,
      url = _testSuite$request.url,
      method = _testSuite$request.method,
      request = _objectWithoutProperties(_testSuite$request, ["url", "method"]);

  var id = (0, _utils.generateRandomHex)();
  return {
    id: id,
    name: testSuite.label,
    description: testSuite.description || '',
    url: url,
    method: method,
    request: request,
    docLink: "/suite/".concat(method, "--").concat((0, _utils.toUrlSafeString)(url), "--").concat(id),
    tests: (0, _utils.toTestCases)(testSuite)
  };
};

exports.toDocsFormat = toDocsFormat;

var saveToFile = function saveToFile(filename) {
  return function (contents) {
    return _fluture.default.node(function (done) {
      return _fs.default.writeFile(filename, contents, done);
    });
  };
};

exports.saveToFile = saveToFile;

var renderPage = function renderPage(outputDir) {
  return (0, _ramda.compose)(saveToFile(outputDir), _html.default, function (children) {
    return {
      children: children
    };
  }, _server.renderToStaticMarkup, _templates.default);
};

exports.renderPage = renderPage;
var build = (0, _ramda.compose)(function (_ref) {
  var outputDir = _ref.outputDir,
      testSuites = _ref.testSuites;
  return renderPage(outputDir)(testSuites);
}, (0, _ramda.evolve)({
  testSuites: (0, _ramda.map)(toDocsFormat)
}));
exports.build = build;