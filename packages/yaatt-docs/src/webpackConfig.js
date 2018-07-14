
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const babelConfig = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-flow',
	],
	plugins: [
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-class-properties',
	],
};

module.exports = ({ templateParameters }) => ({
	mode: 'production',
	entry: {
		main: path.resolve(__dirname, '../templates/index.js'),
	},
	output: {
		path: path.resolve(__dirname, '../dist/static/assets'),
		filename: '[name].[hash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: babelConfig,
				},
			},
		],
	},
	optimization: {
		minimize: true,
		nodeEnv: 'production',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../templates/index.html'),
			filename: path.resolve(__dirname, '../dist/static/index.html'),
			templateParameters,
		}),
	]
});
