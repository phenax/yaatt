"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ApiCardBig = exports.ApiCardSmall = void 0;

var _react = _interopRequireDefault(require("react"));

var _ramda = require("ramda");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApiCardSmall = function ApiCardSmall(_ref) {
  var _ref$api = _ref.api,
      url = _ref$api.url,
      method = _ref$api.method,
      name = _ref$api.name;
  return _react.default.createElement("div", {
    style: _styles.apiCard.small.host
  }, _react.default.createElement("div", {
    style: _styles.apiCard.small.title
  }, _react.default.createElement("span", {
    style: _styles.apiCard.small.title__method
  }, "".concat(method, " ")), _react.default.createElement("span", {
    style: _styles.apiCard.small.title__url
  }, url)), _react.default.createElement("div", {
    style: _styles.apiCard.small.subtitle
  }, name));
};

exports.ApiCardSmall = ApiCardSmall;

var ApiCardBig = function ApiCardBig(_ref2) {
  var _ref2$api = _ref2.api,
      url = _ref2$api.url,
      method = _ref2$api.method,
      name = _ref2$api.name;
  return _react.default.createElement("div", {
    style: _styles.apiCard.big.host
  }, _react.default.createElement("div", {
    style: _styles.apiCard.big.title
  }, _react.default.createElement("span", {
    style: _styles.apiCard.big.title__method
  }, method), _react.default.createElement("span", {
    style: _styles.apiCard.big.title__url
  }, url)), _react.default.createElement("div", {
    style: _styles.apiCard.big.subtitle
  }, name));
};

exports.ApiCardBig = ApiCardBig;

var ApiCard = function ApiCard(_ref3) {
  var api = _ref3.api,
      type = _ref3.type;
  return (0, _ramda.cond)([[(0, _ramda.equals)('small'), function () {
    return _react.default.createElement(ApiCardSmall, {
      api: api
    });
  }], [(0, _ramda.equals)('big'), function () {
    return _react.default.createElement(ApiCardBig, {
      api: api
    });
  }]])(type);
};

var _default = ApiCard;
exports.default = _default;