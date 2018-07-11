"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Layout = require("./components/Layout");

var _Card = require("./components/Card");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var docs = _ref.docs;
  return _react.default.createElement("div", null, _react.default.createElement(_Layout.Container, null, _react.default.createElement(_Layout.Sidebar, null, docs.map(function (api, i) {
    return _react.default.createElement(_Layout.Sidebar.Item, {
      key: i
    }, _react.default.createElement(_Card.ApiCard, {
      type: "small",
      api: api
    }));
  })), _react.default.createElement(_Layout.Main, null, docs.map(function (api, i) {
    return _react.default.createElement(_Card.ApiCard, {
      type: "big",
      api: api,
      key: i
    });
  }))));
};

exports.default = _default;