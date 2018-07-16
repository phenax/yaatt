"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fluture = _interopRequireDefault(require("fluture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(config) {
  return (0, _fluture.default)(function (rej, res) {
    config.throwError ? rej() : res(config);
    return function () {
      return null;
    };
  });
};

exports.default = _default;