const path = require('path')
const webpack = require('webpack');
module.exports = {
	entry: './js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/')
	},
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
        }, {
            test: /\.(png|jpg|gif)$/,
            loaders: ['url?limit=8192&name=images/[name].[ext]'],
        }]
    },
	devServer: {
		hot: true
	}
}