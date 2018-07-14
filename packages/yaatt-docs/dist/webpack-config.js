"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBabelConfig = exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEMPLATE_PATH = _path.default.resolve(__dirname, '../templates');

var _default = function _default(_ref) {
  var templateParameters = _ref.templateParameters,
      outputPath = _ref.outputPath;
  return {
    mode: 'production',
    entry: {
      main: _path.default.join(TEMPLATE_PATH, 'index.js')
    },
    output: {
      path: _path.default.join(outputPath),
      filename: 'assets/[name].js',
      publicPath: '/'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: getBabelConfig()
        }
      }]
    },
    optimization: {
      minimize: true,
      nodeEnv: 'production'
    },
    plugins: [new _htmlWebpackPlugin.default({
      template: _path.default.join(TEMPLATE_PATH, 'index.html'),
      filename: _path.default.join(outputPath, 'index.html'),
      templateParameters: templateParameters
    })]
  };
};

exports.default = _default;

var getBabelConfig = function getBabelConfig() {
  return {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
    plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
  };
};

exports.getBabelConfig = getBabelConfig;