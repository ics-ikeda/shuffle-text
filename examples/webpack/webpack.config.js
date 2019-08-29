module.exports = {
  mode: 'production',
  entry: './src/main.js',

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
};
