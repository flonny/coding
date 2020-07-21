

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config
    return config;
  },
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      config.proxy = {
        '/api': {
          target: 'https://jobs.github.com/',
          changeOrigin: true,
          pathRewrite: {'^/api' : ''}
        }
      }
      // Return your customised Webpack Development Server config.
      return config;
    };
  },
}
// module.exports = function override(config, env) {
//   console.log(config)
//   config.devServer = config.devServer||{}
//   config.devServer.proxy = {
//     '/api': {
//       target: 'https://jobs.github.com/',
//     }
//   }
//   //do stuff with the webpack config...
//   return config;
// }