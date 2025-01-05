const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Define your custom configuration
const customConfig = {
  // Add your custom Metro configuration options here
};

const baseConfig = getDefaultConfig(__dirname); // Get the default Metro config
const mergedConfig = mergeConfig(baseConfig, customConfig); // Merge default and custom configs

// Wrap with Reanimated's Metro config
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
