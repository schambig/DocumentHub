const webpack = require('webpack');

module.exports = function override(config, env) {
  // Soluciona el problema de módulos faltantes en React Native Web
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
    }
  };

  // Provee globalmente los módulos utilizados en tu aplicación
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
}