"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(_ref) {
  var children = _ref.children;
  return "\n<!doctype html>\n<html>\n\t<head>\n\t\t<title>Yo boy</title>\n\t</head>\n\t<body>".concat(children, "</body>\n</html>\n").replace(/\s+/gi, ' ');
};

exports.default = _default;