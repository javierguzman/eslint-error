const babelConfig = api => {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'];
  const plugins = ['@babel/transform-runtime'];

  return {
    presets,
    plugins
  };
};

module.exports = babelConfig;
