const path = require('path');

module.exports = {
  images: {
    formats: ["image/webp"]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {  
    return config;
  },
};
