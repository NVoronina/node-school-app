const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function getExternals() {
	return fs.readdirSync('node_modules')
		.concat(['react-dom/server'])
		.filter((mod) => mod !== '.bin')
		.reduce((externals, mod) => {
			externals[mod] = `commonjs ${mod}`;
			return externals;
		}, {});
}
module.exports = [
	{
		name: 'server side',
		target: 'node',
		externals: getExternals(),
		entry: {
			index: './source/views/index.server.src.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					loader: 'ignore-loader'
				},
			],
		},
		output: {
			filename: '[name].server.js',
			path: path.resolve(__dirname, 'source/views'),
			libraryTarget: 'umd'
		},
		watch: true
	},
	{
		name: 'front side',
		entry: {
			index: './source/views/index.src.js'
		},
		module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			}
		],
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'public'),

		},
		plugins: [
			new ExtractTextPlugin('[name].css')
		],
		watch: true

		},


	];
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
// //const presets = require('');
//npm install card-info emotion antd babel-preset-es2015 babel-preset-react react react-dom eslint-plugin-import eslint-plugin-react eslint-loader postcss-loader style-loader css-loader babel-loader babel-core babel-preset-env html-webpack-plugin eslint-config-airbnb eslint-plugin-jsx-a11y webpack --no-bin-links
// const webpack = require('webpack');
//
// module.exports = {
//     entry: './source/client/index.src.js',
//     output: {
//         path: __dirname + '/public',
//         filename: 'bundle.js'
//     },
//
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: [/node_modules/],
//
//                 use: [{
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['env']
//                     }
//                 }]
//             },
// 	        {
// 		        test: /\.jsx$/,
// 		        exclude: [/node_modules/],
//
// 		        use: [{
// 			        loader: 'babel-loader',
// 			        options: {
// 				        presets: ['env']
// 			        }
// 		        }]
// 	        },
// 	        {
// 		        test: /\.css$/,
// 		        loader: 'style-loader!css-loader'
// 	        }
//
//         ]
//     },
//
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './source/client/index.html',
//         })
//     ]
//
// };