var path = require('path');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: "./build/",
    filename: "build.js" // use [name].[chunkhash].js for production
  },
  // devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader" // presets are set in .babelrc file
        }
      },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader' }
    ]
  }
};