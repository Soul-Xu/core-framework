const path = require('path');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias['components'] = path.resolve(__dirname, "./components");

    // 添加对 React 的支持
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel', '@babel/preset-react'], // 添加 @babel/preset-react
        },
      },
    });

    return config;
  },
};
