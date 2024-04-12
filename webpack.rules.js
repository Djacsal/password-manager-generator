module.exports = [
  // ... existing loader config ...
  {
    test: /\.jsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        exclude: /node_modules/,
        presets: ["@babel/preset-react"],
      },
    },
  },
  // ... existing loader config ...
];
// Put your webpack loader rules in this array.  This is where you would put
// your ts-loader configuration for instance:
/**
 * Typescript Example:
 *
 * {
 *   test: /\.tsx?$/,
 *   exclude: /(node_modules|.webpack)/,
 *   loaders: [{
 *     loader: 'ts-loader',
 *     options: {
 *       transpileOnly: true
 *     }
 *   }]
 * }
 */
