module.exports = {
  target: "electron",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loaders: [ "style-loader", "css-loader?modules" ]
      }
    ]
  },
  entry: {
    "main/index": "./src/main/index.js",
    "renderer/app": "./src/renderer/app.jsx",
    "renderer/captureWindow": "./src/renderer/captureWindow.js",
    "renderer/pincodeWindow": "./src/renderer/pincodeWindow.jsx",
    "renderer/previewWindow": "./src/renderer/previewWindow.jsx"
  },
  output: {
    filename: "dist/[name].js"
  },
  devtool: "source-map"
};