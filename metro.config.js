const { getDefaultConfig } = require('expo/metro-config');
const { FlattenedPlugin } = require('metro-minify-terser');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  minifierPath: 'metro-minify-terser',
  minifierConfig: {
    compress: {
      // Reduce Terser's compression options to avoid memory issues
      inline: 1,
    },
  },
};

// Add module extensions for TypeScript
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'ts', 'tsx', 'jsx'],
  extraNodeModules: new Proxy(
    {},
    get: () => require.resolve + '/../',
  ),
};

module.exports = config;
