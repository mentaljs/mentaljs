module.exports = (baseConfig, env, config) => {
  config.module.rules = config.module.rules.filter(rule => !(
    (rule.use && rule.use.length && rule.use.find(({
      loader
    }) => loader === 'babel-loader'))
  ));
  config.module.rules.push({
    test: /\.(ts|tsx|js|jsx)?$/,
    include: require('path').resolve('./'), // eslint-disable-line global-require
    exclude: /(node_modules|dist)/,
    loader: 'babel-loader',
    options: {
      presets: [
        ['react-app', {
          flow: false,
          typescript: true
        }]
      ],
    },
  });
  // config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};