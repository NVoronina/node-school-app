const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
//const presets = require('');
//npm install eslint-plugin-import eslint-plugin-react eslint-loader postcss-loader style-loader css-loader babel-loader babel-core babel-preset-env html-webpack-plugin eslint-config-airbnb eslint-plugin-jsx-a11y webpack --save-dev --no-bin-links
var webpack = require('webpack');

module.exports = {
    entry: './source/client/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],

                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            },
	        {
		        test: /\.js$/,
		        exclude: /node_modules/,
		        loader: "eslint-loader",
		        options: {
			        // eslint options (if necessary)
		        }
	        }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './source/client/index.html',
        })
    ]

};