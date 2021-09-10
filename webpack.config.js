const path = require('path');

module.exports = {

	mode: 'production',
	entry: './src/index.ts',
	target: 'node',
	output: {
		filename: 'main.js',
		path: path.join(__dirname, '..', 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	externals: {
		express: 'express',
	},
}
