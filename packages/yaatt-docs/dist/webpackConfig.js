"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babelConfig = void 0;

var _path = _interopRequireDefault(require("path"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelConfig = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
  plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
};
exports.babelConfig = babelConfig;

module.exports = function (_ref) {
  var templateParameters = _ref.templateParameters;
  return {
    mode: 'production',
    entry: {
      main: _path.default.resolve(__dirname, '../templates/index.js')
    },
    output: {
      path: _path.default.resolve(__dirname, '../dist/static/assets'),
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        }
      }]
    },
    optimization: {
      minimize: true,
      nodeEnv: 'production'
    },
    plugins: [new _htmlWebpackPlugin.default({
      template: _path.default.resolve(__dirname, '../templates/index.html'),
      filename: _path.default.resolve(__dirname, '../dist/static/index.html'),
      templateParameters: templateParameters
    })]
  };
};