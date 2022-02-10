module.exports = {
   
    //head
    title: 'kwi的博客',
    
    description: 'Cooper\n,\nthis is no time for cautious\n!',
    /*   head: [
          ['link', { rel: 'icon', href: '/kwiImg.jpeg' }]
      ], */
    //导航设置
    themeConfig: {
        logo: '/images/kwiImg.jpg',
        nav: require ('./nav'),
    //侧边栏
        sidebar: require ('./sidebar') 
    },
    //插件相关
    plugins: ['@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: true
    }],
 /*    devServer:{
        proxy:{
            '/api':{
                target:'https://cdn.nlark.com'
            }
        }
    }
 */


}