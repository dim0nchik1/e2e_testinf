const {HotModuleReplacementPlugin} = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  // Set the mode to development or production
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
  },
  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  mode: "development",

  plugins: [
    new HotModuleReplacementPlugin(),
  ],
});
