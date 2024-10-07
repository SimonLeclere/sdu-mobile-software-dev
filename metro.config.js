/* Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
  resolver: {
    assetExts: assetExts.concat(['ttf', 'lottie', 'png']),
    sourceExts: sourceExts
  },
};

module.exports = mergeConfig(defaultConfig, config);
