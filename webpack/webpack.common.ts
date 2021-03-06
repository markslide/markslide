import HtmlWebpackPlugin from 'html-webpack-plugin';
import {Configuration, DefinePlugin} from 'webpack'
import path from 'path'
import packageInfo from '../package.json'

const config: Configuration = {
  entry: {
    'index': './src/entries/index.tsx',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entries/template.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(packageInfo.version),
    }),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   }
  // },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve('./src'),
    },
  },

  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        // options: {
        //   getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
        // },
        exclude: [
          /node_modules/,
          /__test__/
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          'file-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  }

}

export default config
