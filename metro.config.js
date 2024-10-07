const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  'ttf', 'lottie', 'png'
);

module.exports = config;
