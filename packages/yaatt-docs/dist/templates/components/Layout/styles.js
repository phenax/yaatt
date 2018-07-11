"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sidebar = exports.main = exports.container = void 0;
var container = {
  host: {
    display: 'flex',
    width: '100%'
  }
};
exports.container = container;
var main = {
  host: {
    width: '70%'
  }
};
exports.main = main;
var sidebar = {
  host: {
    width: '30%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  item: {
    width: '100%',
    display: 'block'
  }
};
exports.sidebar = sidebar;