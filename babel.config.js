module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        'module-resolver',
        {
          alias: {
            '@types': './src/@types',
            components: './src/components',
            containers: './src/containers',
            templates: './src/templates',
            navigation: './src/navigation',
            translations: './src/translations',
            selectors: './src/selectors',
            store: './src/store',
            types: './src/types',
            utils: './src/utils',
            api: './src/api',
            shared: './src/shared',
            assets: './assets',
          },
        },
      ],
    ],
  };
};
