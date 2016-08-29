module.exports = {
  entry: ['whatwg-fetch', "./src/main.js"],
  output: {
    path: "./public/static",
    publicPath: "/public/static/",
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
          presets: ['latest']
        }
      }
    ]
  }
}
