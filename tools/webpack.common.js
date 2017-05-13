module.exports = {
  module: {
    loaders: [
      {
          test: /\.css$/,
          loader: 'null' //not rendering css in the server  according to his solution: https://github.com/zinserjan/mocha-webpack/issues/5
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel'
      },
      {
        test: /\.txt$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'raw'
      },
      {
        test: /\.json$/, loader: 'json'
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
        loaders: ["file?context=public&name=/[path][name].[ext]"],
        exclude: /node_modules/
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=./fonts/[hash].[ext]"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file&name=./fonts/[hash].[ext]"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&name=./fonts/[hash].[ext]"
      },
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      "src",
      "sass",
      "public",
      "node_modules"
    ],
    extensions: ["", ".json", ".js"]
  }
};
