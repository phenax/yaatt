"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HtmlWrapper = function HtmlWrapper(_ref) {
  var children = _ref.children;
  return _react.default.createElement("html", null, _react.default.createElement("head", null, _react.default.createElement("title", null, "MyPage")), _react.default.createElement("body", null, children));
};

var _default = HtmlWrapper;
exports.default = _default;