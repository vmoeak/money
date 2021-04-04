const path = require('path');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');


module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new AntdDayjsWebpackPlugin({
        preset: 'antdv3'
      })
    ]
  },
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons');

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end()
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()

    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir)
  },
  devServer: {
    // public: '192.168.10.124:8080',//修改这里
    // https: false,
    // hotOnly: false,
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/money-website/'
    : '/'
}
