require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = (env, argv) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'test'
  )
    throw new Error('is neither development nor production not test env')

  const isDevelopment =
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

  return {
    mode: process.env.NODE_ENV,
    entry: {
      main: [
        isDevelopment && 'webpack-hot-middleware/client',
        './src/index.js',
      ].filter(Boolean),
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      alias: {
        Pages: path.resolve(__dirname, 'src/pages/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Assets: path.resolve(__dirname, 'src/assets/'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
      }),
      new CircularDependencyPlugin({ include: /src/ }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment &&
        new ReactRefreshPlugin({
          overlay: {
            sockIntegration: 'whm',
          },
        }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          include: path.join(__dirname, 'src'),
          use: 'babel-loader',
        },
        {
          test: /\.module\.s?css$/,
          use: [
            isDevelopment
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    esModule: true,
                  },
                },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDevelopment
                    ? '[name]__[local]'
                    : '[hash:base64]',
                  compileType: 'module',
                },
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.s?css$/,
          exclude: /\.module\.s?css$/,
          use: [
            isDevelopment
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    esModule: true,
                  },
                },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  compileType: 'icss',
                },
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true,
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: true,
                },
                gifsicle: {
                  interlaced: false,
                },
              },
            },
          ],
        },
      ],
    },
  }
}
