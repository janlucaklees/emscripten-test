const Encore = require('@symfony/webpack-encore');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

if (Encore.isProduction()) {
  Encore
    // directory where compiled assets will be stored
    .setOutputPath('docs/')
    // public path used by the web server to access the output path
    .setPublicPath('/emscripten-test')
    // only needed for CDN's or sub-directory deploy
    .setManifestKeyPrefix('docs')
} else {
  Encore
    // directory where compiled assets will be stored
    .setOutputPath('docs/')
    // public path used by the web server to access the output path
    .setPublicPath('/')
}

Encore
  /*
   * ENTRY CONFIG
   *
   * Each entry will result in one JavaScript file (e.g. app.js)
   * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
   */
  .addEntry('app', './src/web/main.ts')

  .copyFiles({
    from: './src/web',
    pattern: /\.(wasm)$/
  })

  .copyFiles({
    from: './src/web',
    to: 'assets/[name].[ext]',
    pattern: /\.(wasm\.map)$/
  })

  .copyFiles({
    from: './src/simulation',
    to: 'simulation/[name].[ext]',
    pattern: /\.(cpp|h)$/
  })

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  /*
   * FEATURE CONFIG
   *
   * Enable & configure other features below. For a full
   * list of features, see:
   * https://symfony.com/doc/current/frontend.html#adding-more-features
   */
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  .configureBabel((config) => {
    config.plugins.push('@babel/plugin-proposal-class-properties');
  })

  // enables @babel/preset-env polyfills
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  })

  // enables Sass/SCSS support
  .enableSassLoader()

  // uncomment if you use TypeScript
  .enableTypeScriptLoader()

  // uncomment if you use React
  //.enableReactPreset()

  // uncomment to get integrity="..." attributes on your script & link tags
  // requires WebpackEncoreBundle 1.4 or higher
  .enableIntegrityHashes(Encore.isProduction())

  // uncomment if you're having problems with a jQuery plugin
  //.autoProvidejQuery()

  /*
   * PLUGIN CONFIG
   */
  .addPlugin(new HtmlWebpackPlugin({
    'base': '/',
    'title': 'Lucii',
    'template': 'src/web/index.html',
    'xhtml': true
  }))
  ;

module.exports = Encore.getWebpackConfig();
