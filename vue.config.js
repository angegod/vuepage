const PrerenderSPAPlugin = require('prerender-spa-plugin-next');
const path = require('path');


module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') { // 只在生產環境啟用預渲染
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/about', '/battle','/card','/King','/calculator'], // 添加所有需要預渲染的路由
          renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
            renderAfterDocumentEvent: 'render-event' // 使用自定義事件觸發預渲染
          })
        })
      );
    }
  }
};


/*module.exports={
  publicPath: process.env.NODE_ENV === 'vuepage'
    ? '/vuepage/'
    : '/'
}*/


  