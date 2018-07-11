"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ApiCardBig = exports.ApiCardSmall = void 0;

var _react = _interopRequireDefault(require("react"));

var _ramda = require("ramda");

var s = _interopRequireWildcard(require("./styles"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var ApiCardSmall = function ApiCardSmall(_ref) {
  var _ref$api = _ref.api,
      url = _ref$api.url,
      method = _ref$api.method,
      name = _ref$api.name,
      props = _objectWithoutProperties(_ref, ["api"]);

  return _react.default.createElement(s.ApiCard.small, props, _react.default.createElement(s.ApiCard.small.Title, null, _react.default.createElement(s.ApiCard.small.Method, null, "".concat(method, " ")), _react.default.createElement(s.ApiCard.small.Url, null, url)), _react.default.createElement(s.ApiCard.small.Subtitle, null, name));
};

exports.ApiCardSmall = ApiCardSmall;

var ApiCardBig = function ApiCardBig(_ref2) {
  var _ref2$api = _ref2.api,
      url = _ref2$api.url,
      method = _ref2$api.method,
      name = _ref2$api.name,
      props = _objectWithoutProperties(_ref2, ["api"]);

  return _react.default.createElement("div", _extends({
    style: {
      height: '800px',
      width: '100%',
      border: '1px solid #000'
    }
  }, props));
};

exports.ApiCardBig = ApiCardBig;

var ApiCard = function ApiCard(_ref3) {
  var api = _ref3.api,
      type = _ref3.type,
      props = _objectWithoutProperties(_ref3, ["api", "type"]);

  return (0, _ramda.cond)([[(0, _ramda.equals)('small'), function () {
    return _react.default.createElement(ApiCardSmall, _extends({
      api: api
    }, props));
  }], [(0, _ramda.equals)('big'), function () {
    return _react.default.createElement(ApiCardBig, _extends({
      api: api
    }, props));
  }]])(type);
};

var _default = ApiCard;
exports.default = _default;