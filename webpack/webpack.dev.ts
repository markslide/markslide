import {Configuration} from 'webpack'

const path = require('path')
import merge from 'webpack-merge'
import common from './webpack.common'

export default () => {
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [],
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, '../www'),
      hot: false,
      port: 8088,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'iapply.sparker.xyz',
      ],
      proxy: [{
        context: [ '/api'],
        // 118.31.227.192
        target: 'http://118.31.227.192:8000/',
        pathRewrite: {
          '^/api': ''
        }
      }],
    },
  } as Configuration)
}
