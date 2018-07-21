
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TEMPLATE_PATH = path.resolve(__dirname, '../templates');
const BUILD_DIR = path.resolve(__dirname, '../dist/build');

const testSuites = [
	{
		request: {
			url: '/yo',
		},
		tests: {},
	}
];

module.exports = {
	mode: 'development',
	entry: {
		main: path.join(TEMPLATE_PATH, 'index.js'),
	},
	output: {
		path: BUILD_DIR,
		filename: 'assets/[name].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-flow',
						],
						plugins: [
							'@babel/plugin-proposal-object-rest-spread',
							'@babel/plugin-proposal-class-properties',
						],
					},
				},
			},
		],
	},
	optimization: {
		minimize: false,
		nodeEnv: 'development',
	},
	devServer: {
		contentBase: BUILD_DIR,
		compress: true,
		port: 9000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(TEMPLATE_PATH, 'index.html'),
			filename: path.join(BUILD_DIR, 'index.html'),
			templateParameters: {
				globalData: `
					window.__DATA = {};
					window.__DATA.apiDocs = ${JSON.stringify(testSuites)};
				`,
			}
		}),
	]
};
