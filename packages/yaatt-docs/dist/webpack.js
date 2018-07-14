"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _fluture = _interopRequireDefault(require("fluture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(config) {
  return (0, _fluture.default)(function (rej, res) {
    (0, _webpack.default)(config, function (err, stats) {
      return err || stats.hasErrors() ? rej(err || stats.compilation.errors) : res(stats);
    });
    return function () {
      return null;
    };
  });
};

exports.default = _default;