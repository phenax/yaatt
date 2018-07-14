
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const TEMPLATE_PATH = path.resolve(__dirname, '../templates');


export default ({ templateParameters, outputPath }) => ({
	mode: 'production',
	entry: {
		main: path.join(TEMPLATE_PATH, 'index.js'),
	},
	output: {
		path: path.join(outputPath),
		filename: 'assets/[name].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: getBabelConfig(),
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
			template: path.join(TEMPLATE_PATH, 'index.html'),
			filename: path.join(outputPath, 'index.html'),
			templateParameters,
		}),
	]
});


export const getBabelConfig = () => ({
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-flow',
	],
	plugins: [
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-class-properties',
	],
});

