"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiCard = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n\tcolor: #555;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n\tfont-weight: bold;\n\tcolor: #333;\n\ttext-transform: uppercase; \n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n\tfont-size: .8em;\n\tcolor: #888;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n\tfont-size: 1.2em;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\tpadding: .5em;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ApiCard = {};
exports.ApiCard = ApiCard;
ApiCard.small = _styledComponents.default.div(_templateObject());
ApiCard.small.Title = _styledComponents.default.div(_templateObject2());
ApiCard.small.Subtitle = _styledComponents.default.div(_templateObject3());
ApiCard.small.Method = _styledComponents.default.span(_templateObject4());
ApiCard.small.Url = _styledComponents.default.span(_templateObject5());