const Path = {
  FROM: 'src',
  TO: 'dist'
};

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

// Name create function
const createName = (ext) => {
  let name = `${ext}/[name].`;

  if (!isDev) {
    name += '[contenthash].';
  }

  return name += ext;
}

// Plugins function
const applyPlugins = () => {
  return [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, `${Path.FROM}`),
        to: path.resolve(__dirname, `${Path.TO}`),
        globOptions: {
          ignore: ['**/*.css', '**/*.js']
        }
      }]
    }),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new MiniCssExtractPlugin({
      filename: createName('css')
    })
  ];
}

// Scripts function
const runScriptLoader = () => {
  const loaders = [{
    loader: 'babel-loader'
  }];

  return loaders;
}

// Styles function
const runStyleLoader = () => {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
        publicPath: '../'
      }
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        config: { path: './postcss.config.js' }
      }
    }
  ];
}

module.exports = {
  context: path.resolve(__dirname, Path.FROM),
  entry: {
    app: './index.js'
  },
  output: {
    filename: createName('js'),
    path: path.resolve(__dirname, Path.TO),
  },
  devtool: isDev ? 'source-map' : '',
  plugins: applyPlugins(),
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: runScriptLoader()
      },
      // Css
      {
        test: /\.css$/,
        use: runStyleLoader()
      }
    ]
  },
  devServer: {
    hot: isDev,
    overlay: true,
    port: 8081,
  },
}
