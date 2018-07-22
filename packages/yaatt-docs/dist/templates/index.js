"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Pass the docs object to context
var _default = function _default(_ref) {
  var docs = _ref.docs;
  return _react.default.createElement("div", null, _react.default.createElement("h1", null, "Hello world"), _react.default.createElement("pre", null, JSON.stringify(docs, 0, 4)));
};

exports.default = _default;