const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/app.js',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
      loaders: [
     {
       test: /\.jsx?$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets:[ 'es2015', 'react', 'stage-2' ]
       }
     }
   ]
  },
  devtool: 'source-maps',
};
