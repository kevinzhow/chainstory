module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./static",
    publicPath: "/static/",
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.html$/, loader: "html" },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
