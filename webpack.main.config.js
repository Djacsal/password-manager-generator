const path = require("path");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */

  entry: "./src/main.js",
  resolve: {
    fallback: {
      fs: false,
      os: false,
      path: false,
    },
    fallback: {
      path: require.resolve("path-browserify"),
    },
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
  },
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules"),
  },
};
