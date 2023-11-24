const path = require('path');

module.exports = {
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "http://120.79.58.103:8080/",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": "http://120.79.58.103:8080/api/sys-auth/ ",
  //       },
  //     },
  //   },
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {  
    config.resolve.alias['components'] = path.resolve(__dirname, "./components")
    return config;
  },
};
