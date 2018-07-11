"use strict";

var _path = _interopRequireDefault(require("path"));

var _docsGenerator = require("./docs-generator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export * from './docs-generator';
(0, _docsGenerator.saveHtmlDocument)(_path.default.resolve('./test-www/index.html'), [{
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
}]);