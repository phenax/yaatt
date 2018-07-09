"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClass = exports.attachUtility = exports.initializeClassMethods = void 0;

var _ramda = require("ramda");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initializeClassMethods = (0, _ramda.curry)(function (methods, obj) {
  Object.keys(methods).forEach(function (name) {
    obj[name] = function () {
      return methods[name](obj).apply(void 0, arguments);
    };
  });
  return obj;
});
exports.initializeClassMethods = initializeClassMethods;

var attachUtility = function attachUtility(constructor, methods) {
  return function (Factory) {
    Factory.$$ = _objectSpread({}, methods);
    Factory.$$.constructor = constructor;

    Factory.extend = function (_ref) {
      var _ref$constructor = _ref.constructor,
          childConstructor = _ref$constructor === void 0 ? _ramda.identity : _ref$constructor,
          childMethods = _objectWithoutProperties(_ref, ["constructor"]);

      return createClass(_objectSpread({
        constructor: (0, _ramda.compose)(childConstructor, constructor)
      }, methods, childMethods));
    };

    return Factory;
  };
};

exports.attachUtility = attachUtility;

var createClass = function createClass(_ref2) {
  var _ref2$constructor = _ref2.constructor,
      constructor = _ref2$constructor === void 0 ? _ramda.identity : _ref2$constructor,
      methods = _objectWithoutProperties(_ref2, ["constructor"]);

  return attachUtility(constructor, methods)((0, _ramda.compose)(initializeClassMethods(methods), constructor));
};

exports.createClass = createClass;