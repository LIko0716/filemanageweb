 
module.exports = {
  
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'views': '@/views',
        'components': '@/components',
      }
    },
    devServer: {
      proxy: {
          '/api': {
              target: 'http://wzjby.gz2vip.idcfengye.com',
              changeOrigin: true, //是否跨域
              pathRewrite: {
              '^/api': '/' //规定请求地址以什么作为开头
              }
          }
      }
  }
  }
}