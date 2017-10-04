const path = require('path');

module.exports = {
	entry: './source/client/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
				loader: 'file-loader'
			}

		],

	},
	/*resolve: {
		extensions: ['', '.js'],

		alias: {
			image: path.resolve(__dirname, 'public/assets/'),
			fonts: path.resolve(__dirname, 'public/fonts')
		}
	},*/

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),

	},

	watch: true
};
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
// //const presets = require('');
//npm install card-info emotion antd babel-preset-es2015 babel-preset-react react react-dom eslint-plugin-import eslint-plugin-react eslint-loader postcss-loader style-loader css-loader babel-loader babel-core babel-preset-env html-webpack-plugin eslint-config-airbnb eslint-plugin-jsx-a11y webpack --save-dev --no-bin-links
// const webpack = require('webpack');
//
// module.exports = {
//     entry: './source/client/index.js',
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