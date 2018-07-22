"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "buildDocs", {
  enumerable: true,
  get: function get() {
    return _docsGenerator.build;
  }
});

var _docsGenerator = require("./docs-generator");

// export * from './docs-generator';
(0, _docsGenerator.build)({
  outputDir: '/home/akshayn/Desktop/tester/index.html',
  testSuites: [{
    label: 'Hello world',
    request: {
      url: '/yo'
    },
    tests: {
      'should do stuff': {}
    }
  }]
}).fork(console.log, console.log);