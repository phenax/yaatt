"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveHtmlDocument = exports.renderTestSuites = exports.renderApiDocs = exports.toDocsFormat = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _styledComponents = require("styled-components");

var _utils = require("@yaatt/utils");

var _ramda = require("ramda");

var _templates = _interopRequireDefault(require("./templates"));

var _HtmlWrapper = _interopRequireDefault(require("./templates/HtmlWrapper"));

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

var renderApiDocs = function renderApiDocs(apiDocs) {
  var placeholder = '{{{children}}}';
  var sheet = new _styledComponents.ServerStyleSheet();
  var html = (0, _server.renderToString)(sheet.collectStyles(_react.default.createElement(_templates.default, {
    docs: apiDocs
  })));
  var htmlWrapper = (0, _server.renderToString)(_react.default.createElement(_HtmlWrapper.default, {
    styles: sheet.getStyleTags()
  }, placeholder));
  return htmlWrapper.replace(placeholder, html);
};

exports.renderApiDocs = renderApiDocs;
var renderTestSuites = (0, _ramda.compose)(renderApiDocs, (0, _ramda.map)(toDocsFormat));
exports.renderTestSuites = renderTestSuites;

var saveHtmlDocument = function saveHtmlDocument(fileName, testSuites) {
  var htmlStr = renderTestSuites(testSuites);

  _fs.default.writeFileSync(fileName, htmlStr);
};

exports.saveHtmlDocument = saveHtmlDocument;