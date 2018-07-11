"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _docsGenerator = require("./docs-generator");

Object.keys(_docsGenerator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _docsGenerator[key];
    }
  });
});
console.log((0, _docsGenerator.renderTestSuite)({
  label: 'Httpbin Get call',
  request: {
    url: 'http://httpbin.org/get',
    method: 'get'
  },
  tests: {
    'should have name set to Waluigi': {
      request: {
        params: {
          name: 'Waluigi'
        }
      }
    },
    'should have custom header set to Yep': {}
  }
}));