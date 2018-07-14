"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUrlSafeString = exports.generateRandomHex = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateRandomHex = function generateRandomHex() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  return _crypto.default.randomBytes(size / 2).toString('hex');
};

exports.generateRandomHex = generateRandomHex;

var toUrlSafeString = function toUrlSafeString(str) {
  return (str || '').replace(/^https?:\/\//gi, '').replace(/[^A-Za-z0-9]+/gi, '-');
};

exports.toUrlSafeString = toUrlSafeString;