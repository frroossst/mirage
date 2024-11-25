const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel', // Windows packaging
      config: {
        name: 'mirage', // Set your app's name here
        icon: './assets/icon.ico', // Set Windows icon
      },
    },
    {
      name: '@electron-forge/maker-zip', // macOS packaging
      platforms: ['darwin'],
      config: {
        icon: './assets/icon.icns', // macOS icon
      },
    },
    {
      name: '@electron-forge/maker-deb', // Linux .deb packaging
      config: {
        options: {
          icon: './assets/icon.png', // Linux icon
          productName: 'mirage',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm', // RPM packaging for Linux
      config: {
        options: {
          icon: './assets/icon.png', // Linux icon
          productName: 'mirage',
        },
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
