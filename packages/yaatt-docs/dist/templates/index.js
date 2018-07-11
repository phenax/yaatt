"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Layout = require("./components/Layout");

var _Card = require("./components/Card");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTestUrl = function getTestUrl(_ref) {
  var id = _ref.id;
  return "/test/".concat(id);
};

var _default = function _default(_ref2) {
  var docs = _ref2.docs;
  return _react.default.createElement("div", null, _react.default.createElement(_Layout.Container, null, _react.default.createElement(_Layout.Sidebar, null, docs.map(function (api) {
    return _react.default.createElement(_Layout.Sidebar.Item, {
      key: api.id
    }, _react.default.createElement(_Layout.Sidebar.Link, {
      href: "#".concat(getTestUrl(api))
    }, _react.default.createElement(_Card.ApiCard, {
      type: "small",
      api: api
    })));
  })), _react.default.createElement(_Layout.Main, null, docs.map(function (api) {
    return _react.default.createElement(_Card.ApiCard, {
      id: getTestUrl(api),
      type: "big",
      api: api,
      key: api.id
    });
  }))));
};

exports.default = _default;