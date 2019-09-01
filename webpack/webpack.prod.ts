import merge from 'webpack-merge'
import common from './webpack.common'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'

export default merge(common, {
  plugins: [
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  mode: 'production',
})
