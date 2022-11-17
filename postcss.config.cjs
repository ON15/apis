module.exports = (config) => {
  /*   Hilfsvariablen, um zwischen schneller lokaler Entwicklung ("Development") und optimierter
  Erzeugung des Codes, der tatsächlich online gestellt wird ("Production"), zu unterscheiden.  */
  const isProduction = config.env === 'production';

  const postcssPresetEnv = require('postcss-preset-env');

  // Mögliche Optionen für postcssPresetEnv:
  // https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options
  const plugins = [postcssPresetEnv()];

  if (isProduction) {
    // Optimiere (verkleinere) Dateien nur im production-Modus.
    plugins.push(require('cssnano'));
  }

  return {
    plugins,
    map: {
      inline: false,
    },
  };
};
