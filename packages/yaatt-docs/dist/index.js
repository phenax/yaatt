"use strict";

var _docsGenerator = require("./docs-generator");

// export * from './docs-generator';
var apiDocs = [{
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
      },
      onResponse: function onResponse(response) {
        return response.matchProp(['args', 'name'], 'Waluigi');
      }
    },
    'should have custom header set to Yep': {
      request: {
        headers: {
          'X-Hello-World': 'Yep'
        }
      }
    }
  }
}, {
  label: 'Httpbin Post call',
  request: {
    url: 'http://httpbin.org/post',
    method: 'post'
  },
  tests: {
    'should have name set to JoLuigi': {
      request: {
        params: {
          name: 'JoLuigi'
        }
      },
      onResponse: function onResponse(response) {
        return response.matchProp(['args', 'name'], 'JoLuigi');
      }
    },
    'should have custom header set to Wow': {}
  }
}];
(0, _docsGenerator.buildPage)(apiDocs).fork(console.log, function (d) {
  return console.log('done');
});