const { getDefaultConfig } = require("@expo/metro-config");

/**
 * This configuration is required to make the Firebase JS SDK (v9+)
 * compatible with the Expo Metro bundler. It ensures that CommonJS
 * modules (.cjs) used by Firebase are correctly resolved.
 */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
