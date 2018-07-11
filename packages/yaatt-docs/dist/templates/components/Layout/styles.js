"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = exports.Main = exports.Container = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n\tdisplay: block;\n\ttext-decoration: none;\n\tcolor: inherit;\n\n\t&:hover {\n\t\tbackground-color: #f6f6f6;\n\t}\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n\tdisplay: block;\n\twidth: 100%;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n\twidth: 30%;\n\tmin-width: 400px;\n\toverflowY: auto;\n\toverflowX: hidden;\n\tborder: 1px solid #000;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n\twidth: 100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\tdisplay: flex;\n\twidth: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents.default.div(_templateObject());

exports.Container = Container;

var Main = _styledComponents.default.div(_templateObject2());

exports.Main = Main;

var Sidebar = _styledComponents.default.div(_templateObject3());

exports.Sidebar = Sidebar;
Sidebar.Item = _styledComponents.default.div(_templateObject4());
Sidebar.Link = _styledComponents.default.a(_templateObject5());