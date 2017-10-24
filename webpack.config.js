const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: './dist/web-book.min.js',
    library: 'WebBook',
    libraryTarget: 'var'
  },
  module: {
	  rules: [
		{
		  test: /\.js$/,
		  use: {
			loader: 'babel-loader',
			options: {
			  presets: ['env']
			}
		  }
		}
	  ]
  },
  plugins: [
	  new UglifyJSPlugin({
		  sourceMap: true
	  })
  ]
};
