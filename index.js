if (process.env.NODE_ENV === 'production') {
  require('./dist/server.bundle.js');
} else {
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack.config.babel.js",
          "vebose": false
        }
      ]
    ]
  });
  require('babel-polyfill');

  require('./server/server');
}
